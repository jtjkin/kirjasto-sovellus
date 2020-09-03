const nodemailer = require('nodemailer')
const config = require('../utils/config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD
    }
})

const sendBookAvailableMessageTo = ({user, book}) => {
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: user.email,
        subject: 'Varaamasi kirja on saapunut käsikirjastoon',
        text: `Hei,
        varaamasi kirja, '${book.title}', on palautettu käsikirjastoon ja on noudettavissa hyllystä.
        Jos et halua lainata kirjaa, muista perua varauksesi.
        Muista, että jos et ole lainannut kirjaa viikon sisällä, ilmoitus saapumisesta lähetetään myös muilla varaajille.
        Muista myös, että varaus ei ole sitova vaan muut voivat noutaa kirjan hyllystä.

        Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.`,
        html: `
            <div>Hei,</div> 
            <div>&nbsp;&nbsp;</div>
            <div>varaamasi kirja, <b>'${book.title}'</b>, on palautettu käsikirjastoon ja on noudettavissa hyllystä.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Jos et halua enää lainata kirjaa, muista perua varauksesi. Jos et ole lainannut kirjaa viikon sisällä, ilmoitus saapumisesta lähetetään myös muilla varaajille.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Muista myös, että varaus ei ole sitova vaan muut voivat noutaa kirjan hyllystä.</div>
            <div>&nbsp;&nbsp;</div>
            <hr>
            <div>&nbsp;&nbsp;</div>
            <div>Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.</div>`
    }
    
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('mailer (error):', error)
        } else {
            console.log('mailer (success):', info.response)
        }
    })
    
}

const sendBookHasBeenLoanedMessageTo = ({user, book}) => {
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: user.email,
        subject: 'Varaamasi kirja on lainattu',
        text: `Hei,
        varaamasi kirja, '${book.title}', on valitettavasti lainattu.
        Varauksesi on kuitenkin edelleen voimassa. Käsikirjaston suositeltu laina-aika on 2 viikkoa, minkä jälkeen lainaaja saa muistutuksen varauksestasi.
        Kiireellisessä tapauksessa ole yhteydessä itse lainaajaan.

        Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.`,
        html: `
            <div>Hei,</div> 
            <div>&nbsp;&nbsp;</div>
            <div>varaamasi kirja, <b>'${book.title}'</b>, on valitettavasti lainattu.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Varauksesi on kuitenkin edelleen voimassa. Käsikirjaston suositeltu laina-aika on 2 viikkoa, minkä jälkeen lainaaja saa muistutuksen varauksestasi.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Kiireellisessä tapauksessa ole yhteydessä itse lainaajaan.</div>
            <div>&nbsp;&nbsp;</div>
            <hr>
            <div>&nbsp;&nbsp;</div>
            <div>Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.</div>`
    }
    
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('mailer (error):', error)
        } else {
            console.log('mailer (success):', info.response)
        }
    })   
}

const sendBookHasBeenReservedMessageTo = ({user, book}) => {
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: user.email,
        subject: 'Lainaamallesi kirjalle on tullut uusi varaus',
        text: `Hei,
        lainaamallesi kirjalle, '${book.title}', on tullut varaus.
        Käsikirjaston suositeltu laina-aika on 2 viikkoa, minkä jälkeen alat saada automatisoituja palautuskehoituksia. Voit siis edelleen pitää lainaasi.
        Jos et kuitenkaan tarvitse kirjaa akuutisti, suosittelemme kuitenkin palauttamaan sen, jotta kaikilla on mahdollisuus aineiston käyttöön.

        Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.`,
        html: `
            <div>Hei,</div> 
            <div>&nbsp;&nbsp;</div>
            <div>lainaamallesi kirjalle, <b>'${book.title}'</b>, on tullut uusi varaus.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Käsikirjaston suositeltu laina-aika on 2 viikkoa, minkä jälkeen alat saada automatisoituja palautuskehoituksia. Voit siis edelleen pitää lainaasi.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Jos et kuitenkaan tarvitse kirjaa akuutisti, suosittelemme kuitenkin palauttamaan sen, jotta kaikilla on mahdollisuus aineiston käyttöön.</div>
            <div>&nbsp;&nbsp;</div>
            <hr>
            <div>&nbsp;&nbsp;</div>
            <div>Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.</div>`
    }
    
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('mailer (error):', error)
        } else {
            console.log('mailer (success):', info.response)
        }
    })   
}

const sendForgottenPasswordMessageTo = ({user, password}) => {
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: user.email,
        subject: 'Salasanasi on nollattu',
        text: `Hei,
        Pyyntösi uudelle salasanallesi on käsitelty. Uusi generoitu salasanasi on ${password}.
        Vaihda salasanasi välittömästi uuteen!

        Jos et tehnyt muutospyyntöä itse, ole yhteydessä sovelluksen kehittäjään jtjkin@utu.fi
        
        Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.`,
        html: `
            <div>Hei,</div> 
            <div>&nbsp;&nbsp;</div>
            <div>Pyyntösi uudelle salasanallesi on käsitelty. Uusi generoitu salasanasi on ${password}.</div>
            <div>&nbsp;&nbsp;</div>
            <div>Vaihda salasanasi välittömästi uuteen!</div>
            <div>&nbsp;&nbsp;</div>
            <div>Jos et tehnyt muutospyyntöä itse, ole yhteydessä sovelluksen kehittäjään jtjkin@utu.fi.</div>
            <div>&nbsp;&nbsp;</div>
            <hr>
            <div>&nbsp;&nbsp;</div>
            <div>Tämä viesti on automaattinen, eikä siihen voi vastata. Tarvittaessa ole yhteydessä käsikirjaston vastuuhenkilöön.</div>`
    }
    
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('mailer (error):', error)
        } else {
            console.log('mailer (success):', info.response)
        }
    })   
}

const sendBackUp = ({books}) => {
    const message = {
        from: `"${config.appTitle} käsikirjasto" ${config.EMAIL}`,
        to: config.EMAIL,
        subject: 'Kuukausittainen varmuuskopio',
        text: `${books.toString()}`
    }
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('mailer (error):', error)
        } else {
            console.log('mailer (success):', info.response)
        }
    })   
}

module.exports = {
    sendBookAvailableMessageTo,
    sendBookHasBeenLoanedMessageTo,
    sendBookHasBeenReservedMessageTo,
    sendForgottenPasswordMessageTo,
    sendBackUp
}