const express = require('express')
const router = express.Router()
const validation = require('./validation')
const usersControllers = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const { createAccountLimiter }  = require('../../../helpers/rate-limit');

router.post('/auth/register', createAccountLimiter, validation.validateAuth, usersControllers.registration)
router.post('/auth/login', validation.validateAuth, usersControllers.login)
router.post('/auth/logout', guard, usersControllers.logout)

router.get('/current', guard, usersControllers.currentUser);

module.exports = router