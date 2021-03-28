const Contact = require('./schemas/contact')

const listContacts = async (userId, { sortBy, sortByDesc, filter, page = '1', limit = '20'}) => {
  const results = await Contact.paginate({ owner: userId }, {
    limit,
    page,
    populate: {
    path: 'owner',
    select: 'email subscription -_id',
    }
  })
  const {docs: contacts, totalDocs: total} = results
  return {total: total.toString(), page, limit, contacts}
  // return results
}

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body, userId) => {
   const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  )
  return result 
}

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId })
  return result 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
