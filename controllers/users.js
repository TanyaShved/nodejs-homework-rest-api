const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
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
       const isValidPassword = await user.validPassword(password)
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

module.exports = {
    registration,
    login,
    logout,
    currentUser
}