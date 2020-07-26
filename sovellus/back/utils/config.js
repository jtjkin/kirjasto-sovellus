require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const bookStatus = {
    FREE: 'free',
    BORROWED: 'borrowed',
    RESERVED: 'reserved'
}

module.exports = {
    MONGODB_URI,
    PORT,
    bookStatus
}