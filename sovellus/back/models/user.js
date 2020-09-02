const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    role: String,
    passwordHash: String,
    admin: Boolean,
    canAddBooks: Boolean,
    deniedBorrowing: Boolean,
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    arrivedReservations: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book'
    }],
    returnRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    ips: [String]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.email
        delete returnedObject.name
        delete returnedObject.passwordHash
        delete returnedObject.deniedBorrowing
        delete returnedObject.ips
        delete returnedObject.canAddBooks
    }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User