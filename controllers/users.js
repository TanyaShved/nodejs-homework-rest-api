const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { HttpCode } = require('../helpers/constants')
const createFolderIsExist = require('../helpers/create-dir');
const User = require('../model/schemas/user');
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Users.findByEmail(email)
        if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: "Email in use",
    })
}
    const newUser = await Users.addUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          avatarURL: newUser.avatarURL,
    subscription: newUser.subscription,
  }
      }
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
     try {
        const { email, password } = req.body
       const user = await Users.findByEmail(email)
       const isValidPassword = await user?.validPassword(password)
        if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: "Email or password is wrong",
    })
}
         const id = user.id
         const payload = { id }
         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" })
         await Users.uppdateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
  user: {
    email: user.email,
    subscription: user.subscription,
  }
}
      })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, _next) => {
  const id = req.user.id
  await Users.uppdateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
     if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
     }
    
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateUserSub = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Users.updateUserSub(id, req.body.subscription);
    const user = await Users.findById(id);
    
     if (!user) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Bad request',
      });
    }

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`
    const img = await Jimp.read(pathFile)
    await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile)
    await createFolderIsExist(path.join(AVATAR_OF_USERS, id))
    fs.rename(pathFile, path.join(AVATAR_OF_USERS, id, newNameAvatar))
    const avatarUrl = path.normalize(path.join(id, newNameAvatar))
    try {
      await fs.unlink(path.join(process.cwd(), AVATAR_OF_USERS, req.user.avatarURL))
    } catch (e) {
      console.log(e.message);
    }
    await Users.uppdateAvatar(id, avatarUrl)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatarUrl,
        },
    });
  } catch (e) {
    next(e); 
  }
}

module.exports = {
    registration,
    login,
    logout,
    currentUser,
    updateUserSub,
    avatars
}