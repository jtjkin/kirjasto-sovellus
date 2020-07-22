const jwt = require('jsonwebtoken')
const infoRouter = require('express').Router()

//TODO
//tarkista token pyyntöjen yhteydessä
//infotiedotteet tietokantaan
//adminin infomuutos-api
    //tiedote
    //voimassaoloaika

infoRouter.get('/', (request, response) => {
    response.status(200).json({
        bulletins: [
            {bullet: 'Palvelussa käyttökatko 1.1.-1.7', valid: '1.1.2020'},
            {bullet: 'Koodaus on vielä kesken. Siedä vielä hetki.'}
        ]
    })
})

module.exports = infoRouter