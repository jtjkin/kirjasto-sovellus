const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const booksRouter = require('./routers/booksRouter')
const loginRouter = require('./routers/loginRouter')
const userRouter = require('./routers/userRouter')
const infoRouter = require('./routers/infoRouter')

mongoose.set('useFindAndModify', false);
app.set('trust proxy', 1)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        logger.info('connected to MongoDB')
    }).catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(cors())
app.use(express.json())
app.use(limiter)

app.use(middleware.tokenExtractor)

app.use('/api/books', booksRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/info', infoRouter)

module.exports = app