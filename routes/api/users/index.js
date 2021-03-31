const express = require('express')
const router = express.Router()
const validation = require('./validation')
const usersControllers = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const { createAccountLimiter } = require('../../../helpers/rate-limit');
const upload = require('../../../helpers/upload')

router.post('/auth/register', createAccountLimiter, validation.validateAuth, usersControllers.registration)
router.post('/auth/login', validation.validateAuth, usersControllers.login)
router.post('/auth/logout', guard, usersControllers.logout)

router.get('/current', guard, usersControllers.currentUser);

router.patch('/', guard, usersControllers.updateUserSub);

router.patch('/avatars', [guard, upload.single('avatar'), validation.validateUploadAvatar], usersControllers.avatars)

router.get('/auth/verify/:verificationToken', usersControllers.verify);

module.exports = router