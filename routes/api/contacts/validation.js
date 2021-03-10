const Joi = require("joi");
const { HttpCode } = require('../../../helpers/constants')

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().max(30).pattern(/^[0-9]+$/).required(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2}).optional(),
    phone: Joi.string().max(30).pattern(/^[0-9]+$/).optional(),
})

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

module.exports.addContact = (req, _res, next) => {
    return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, _res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}