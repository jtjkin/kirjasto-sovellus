const mongoose = require('mongoose')

const infoSchema = mongoose.Schema({
    joinCode: String,
    userActivityLogger: [
        {
            date: Date,
            activity: [String]
        }
    ],
    bulletins: [
        {
            bullet: String,
            valid: String
        }
    ]
})

module.exports = mongoose.model('Info', infoSchema)