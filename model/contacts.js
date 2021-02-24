const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid');
const contactsPath = path.join(__dirname, "../model/contacts.json");

// const db = require('./db')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8")
  return JSON.parse(contacts); 
  //  return db.value()
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => String(id) === contactId);

    return contactById;
  // return db.get('contacts')
  // .find({ id })
  // .value()
}


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => String(id) !== contactId);
  
  const deleteContact = contacts.find(({id}) => String(id) === contactId)
  
   await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8',
   );
  
  return deleteContact;
  
  // const [record] = db.get('contacts')
  // .remove({ id })
  //   .write()
  // return record
}

const addContact = async (body) => {
 const contacts = await listContacts();
 const newContact = {
      id: uuid(),
      ...body,
 };
  
  const newContacts = [...contacts, newContact]
  

  await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8',
  );
  
  return newContact

  // const id = uuid()
  // const record = {
  //   id,
  //   ...body,
  // }
  // db.get('contacts').push(record).write()
  // return record
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => String(contact.id) === id)
  const updete = { ...contact, ...body }

  const newContacts = contacts.map((contact) =>
    String(contact.id) === id ? updete : contact
  );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8',
    );
  
  return updete

  // const record = db.get('contacts').find({ id }).assign(body).value()
  // db.write()
// return record.id ? record : null
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
