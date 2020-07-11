const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const booksRouter = require('./routers/booksRouter')

app.use(cors())
app.use(express.json())

app.use('/api/books', booksRouter)

module.exports = app