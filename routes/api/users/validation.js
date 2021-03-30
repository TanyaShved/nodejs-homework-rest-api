const Joi = require("joi");
const { HttpCode } = require('../../../helpers/constants')

const schemaValidateAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2}).required(),
  password: Joi.string().min(7).required(),
});

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Filed: ${message.replace(/"/g, "")}`,
        })
    }
    next() 
}

module.exports.validateAuth = (req, _res, next) => {
    return validate(schemaValidateAuth, req.body, next)
}

module.exports.validateUploadAvatar = (req, _res, next) => {
  if (!req.file) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'Bad request',
    });
  }
  next();
};
