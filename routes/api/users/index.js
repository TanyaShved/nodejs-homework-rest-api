const express = require('express')
const router = express.Router()
const validation = require('./validation')
const userController = require('../../../controllers/users')

router.post('/auth/register')
router.post('/auth/login')
router.post('/auth/logout')

module.exports = router