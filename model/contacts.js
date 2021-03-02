// const fs = require('fs/promises')
// const path = require('path')
// // const { v4: uuid } = require('uuid');
// const contactsPath = path.join(__dirname, "../model/contacts.json");

const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name)  => {
const client = await db
const collection = await client.db().collection(name)
return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const [result] = await collection.find({ _id: objectId }).toArray()
  return result
}

const addContact = async (body) => {
  const collection = await getCollection(db, 'contacts')
  const record = {
    ...body,
  }
  const { ops: [result] } = await collection.insertOne(record)
  return result
}

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  const { value: result } = await collection.findOneAndUpdate({ _id: objectId }, { $set: body }, { returnOriginal: false })
  return result 
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  return result 
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
