const Contact = require('./schemas/contact')

// const db = require('./db')
// const { ObjectID } = require('mongodb')

// const getCollection = async (db, name)  => {
// const client = await db
// const collection = await client.db().collection(name)
// return collection
// }

const listContacts = async () => {
  const results = await Contact.find({})
  return results
  // const collection = await getCollection(db, 'contacts')
  // const results = await collection.find({}).toArray()
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result

  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(contactId)
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result

  // const collection = await getCollection(db, 'contacts')
  // const record = {
  //   ...body,
  // }
  // const { ops: [result] } = await collection.insertOne(record)
}

const updateContact = async (id, body) => {
   const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  )
  return result 

  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(id)
  // const { value: result } = await collection.findOneAndUpdate({ _id: objectId }, { $set: body }, { returnOriginal: false })
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  return result 

  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(contactId)
  // const { value: result } = await collection.findOneAndDelete({ _id: objectId })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
