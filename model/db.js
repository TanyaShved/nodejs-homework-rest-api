const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

mongoose.connection.on('conected', () => {
    console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
    console.log(`Database connection error: ${err.message}`)
})

mongoose.connection.on('disconected', () => {
    console.log('Database disconected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Connection for db is closed and app is terminated')
    process.exit(1)
})
  
module.exports = db