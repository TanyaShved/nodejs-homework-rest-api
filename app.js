const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');
const helmet = require("helmet");
const { HttpCode, Folder } = require('./helpers/constants')
const { apiLimiter }  = require('./helpers/rate-limit');

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

app.use(express.static(path.join(__dirname, Folder.PUBLIC)));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

// only apply to requests that begin with /api/
app.use("/api/", apiLimiter );

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
})

module.exports = app
