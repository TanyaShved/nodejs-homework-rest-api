const express = require('express')
const router = express.Router()
const validation = require('./validation')
const contactsControllers = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

router
.get('/', guard, contactsControllers.getAll)
.post('/', guard, validation.addContact, contactsControllers.createContact)

router
.get('/:contactId', guard, contactsControllers.getById)
.patch('/:contactId', guard, validation.updateContact, contactsControllers.update)
.delete('/:contactId', guard, contactsControllers.deleteContact)

module.exports = router
