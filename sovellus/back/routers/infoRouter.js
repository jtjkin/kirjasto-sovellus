const jwt = require('jsonwebtoken')
const infoRouter = require('express').Router()
const Info = require('../models/info')

//TODO
//infotiedotteet tietokantaan
//adminin infomuutos-api
    //tiedote
    //voimassaoloaika

infoRouter.get('/', (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    response.status(200).json({
        bulletins: [
            {bullet: 'Palvelussa käyttökatko 1.1.-1.7', valid: '1.1.2020'},
            {bullet: 'Koodaus on vielä kesken. Siedä vielä hetki.'}
        ]
    })
})

//TODO
//front
//testaus

//TODO
//bulletins lisäys, poisto ja muokkaus

//TODO
//front
//testaus
infoRouter.post('/change-joincode', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id || !decodedToken.admin) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const info = await Info.find({})

    /*
    Create new if not in database.
    */

    //TODO
    //poista tästä ja lisää initialize koko palvelu kohtaan?
    if (!info[0]) {
        newInfo = new Info (
            {
                joinCode: request.body.joinCode,
                userActivityLogger: [],
                bulletins: []
            }
        )

        const savedInfo = await newInfo.save()
        const newJoincode = {joinCode: savedInfo.joinCode}

        return response.status(200).json(newJoincode)
    }

    const savedInfo = await Info.findByIdAndUpdate(
        info[0].id, 
        {joinCode: request.body.joinCode}, 
        {new: true}
    )

    const newJoinCode = {joinCode: savedInfo.joinCode}

    response.status(200).json(newJoinCode)
})

module.exports = infoRouter