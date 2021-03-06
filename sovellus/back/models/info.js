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
    adminActivity: [String],
    forgottenPasswordActivity: [String],
    lastBackUp: Date
})

module.exports = mongoose.model('Info', infoSchema)