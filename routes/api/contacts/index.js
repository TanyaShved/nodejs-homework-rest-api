const express = require('express')
const router = express.Router()
const validation = require('./validation')
const contactsControllers = require('../../../controllers/contacts')

router
.get('/', contactsControllers.getAll)
.post('/', validation.addContact, contactsControllers.createContact)

router
.get('/:contactId', contactsControllers.getById)
.patch('/:contactId', validation.updateContact, contactsControllers.update)
.delete('/:contactId', contactsControllers.deleteContact)

module.exports = router
