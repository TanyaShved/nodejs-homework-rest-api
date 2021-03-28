const express = require('express')
const router = express.Router()
const validation = require('./validation')
const usersControllers = require('../../../controllers/users')
const guard = require('../../../helpers/guard')

router.post('/auth/register', validation.validateAuth, usersControllers.registration)
router.post('/auth/login', validation.validateAuth, usersControllers.login)
router.post('/auth/logout', guard, usersControllers.logout)

module.exports = router