const mongoose = require('mongoose')

const infoSchema = mongoose.Schema({
    joinCode: String,
    userActivityLogger: [
        {
            date: Date,
            activity: [String]
        }
    ],
    bulletins: [String],
    adminActivity: [
        {
            date: Date,
            activity: String
        }

    ]
})

module.exports = mongoose.model('Info', infoSchema)