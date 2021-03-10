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
    subscription: "free"
  }
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
    registration,
}