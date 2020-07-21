const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publicationsYear: String,
    publisher: String,
    free: Boolean,
    reserved: Boolean,
    borrowed: Boolean,
    borrower: {
        borrowDate: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Book', bookSchema)