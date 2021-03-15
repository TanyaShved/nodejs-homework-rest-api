const Contact = require('./schemas/contact')

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId })
  return results
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body) => {
   const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  )
  return result 
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  return result 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
