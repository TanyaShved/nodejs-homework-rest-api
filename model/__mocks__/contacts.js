const { contacts } = require('./data');

const listContacts = jest.fn(
  (userId, { sortBy, sortByDesc, sub, page = '1', limit = '20' }) => {
    return { total: contacts.length, page, limit, contacts };
  },
);

const getContactById = jest.fn((contactId, userId) => {
  const [contact] = contacts.filter(el => String(el._id) === String(contactId));
  return contact;
})

const addContact = jest.fn(body => {
  const newContact = { ...body, _id: '1242346b265ddc184c7cb333' };
  contacts.push(newContact);
  return newContact;
})

const updateContact = jest.fn((id, body, userId) => {
  let [contact] = contacts.filter(el => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
})

const removeContact = jest.fn((contactId, userId) => {
  const index = contacts.findIndex(el => String(el._id) === String(contactId));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
