const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    authorsShort: String,
    author: String,
    publicationYear: String,
    publisher: String,
    status: {
        type:String,
        enum: ['free', 'reserved', 'borrowed'],
        default: 'free'
    },
    borrower: {
        borrowDate: Date,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    reserver: {
        reserveDate: Date,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    addedBy: {
        date: Date,
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