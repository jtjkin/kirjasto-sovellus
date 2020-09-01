require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const EMAIL = process.env.EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

const bookStatus = {
    FREE: 'free',
    BORROWED: 'borrowed',
    RESERVED: 'reserved'
}

const appTitle = 'Arkeologian'

module.exports = {
    MONGODB_URI,
    PORT,
    bookStatus,
    EMAIL,
    EMAIL_PASSWORD,
    appTitle
}