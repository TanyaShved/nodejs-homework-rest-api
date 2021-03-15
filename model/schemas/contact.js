const { Schema, model, SchemaTypes } = require('mongoose');

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
    },
     owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
}, { versionKey: false, timestamps: true })
  
const Contact = model('contact', contactSchema)
  
module.exports = Contact