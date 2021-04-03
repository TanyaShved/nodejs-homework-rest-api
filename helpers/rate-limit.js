const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: "Too many requests, please try again later",
      })  
  }
});

const createAccountLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, 
  max: 10,
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: "Too many requests, please try again later",
      })  
  }
});

module.exports = { apiLimiter, createAccountLimiter };