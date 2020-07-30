const nodemailer = require('nodemailer')
const config = require('../utils/config')

const sendBookAvailableMessageTo = ({user, book}) => {
    //TODO
    //sovellukselle oma gmail-osoite

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL,
          pass: config.EMAIL_PASSWORD
        }
    })

    //TODO 
    //tarkista toimivuus
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: user.email,
        subject: 'Varaamasi kirja on saapunut käsikirjastoon',
        text: `Hei, varaamasi kirja, ${book.title}, on palautettu käsikirjastoon.`
    }
    
    /*
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info.response)
        }
    })
    */
}

module.exports = {
    sendBookAvailableMessageTo
}