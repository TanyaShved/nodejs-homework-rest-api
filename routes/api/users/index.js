const express = require('express')
const router = express.Router()
const validation = require('./validation')
const usersControllers = require('../../../controllers/users')

module.exports = router