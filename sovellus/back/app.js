const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const booksRouter = require('./routers/booksRouter')
const loginRouter = require('./routers/loginRouter')
const userRouter = require('./routers/userRouter')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        logger.info('connected to MongoDB')
    }).catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/books', booksRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

module.exports = app