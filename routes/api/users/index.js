const express = require('express')
const router = express.Router()
const validation = require('./validation')
const usersControllers = require('../../../controllers/users')

router.post('/auth/register', usersControllers.registration)
router.post('/auth/login', usersControllers.login)
router.post('/auth/logout', usersControllers.logout)

module.exports = router