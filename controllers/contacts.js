const Contacts = require('../model/contacts')

const getAll = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
  return res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    }
  } catch (error) {
    next(error)
  }
}

const createContact = async (req, res, next) => {
   try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (Object.values(req.body).length === 0) {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: "missing fields",
    })
    }
   if (contact) {
  return res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    }
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
  return res.json({
      status: 'success',
      code: 200,
      message: "contact deleted"
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getAll,
    getById,
    createContact,
    update,
    deleteContact
}