const jwt = require('jsonwebtoken')
const infoRouter = require('express').Router()
const Info = require('../models/info')
const User = require('../models/user')
const dataStripper = require('../utils/dataStripper')

//TODO
//infotiedotteet tietokantaan
//adminin infomuutos-api
    //tiedote
    //voimassaoloaika

infoRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const all = await Info.find({})
    const info = all[0]

    response.status(200).json({bulletins: info.bulletins})
})

infoRouter.post('/change-joincode', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    const info = await Info.find({})

    if (!info[0]) {
        newInfo = new Info (
            {
                joinCode: request.body.code,
                userActivityLogger: [],
                bulletins: [],
                adminActivity: []
            }
        )

        const savedInfo = await newInfo.save()
        const newJoincode = {joinCode: savedInfo.code}

        return response.status(200).json(newJoincode)
    }

    await Info.findByIdAndUpdate(
        info[0].id, 
        {joinCode: request.body.code}
    )

    response.status(200).send()
})

infoRouter.get('/admin-panel', async (request,response) => {

    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    const withAdminRights = await User.find({admin: true})
    const withAdminRightSafeList = dataStripper.justNamesAndRolesList(withAdminRights)

    const info = await Info.find({})

    if (info.length === 0) {
        const newInfo = new Info()
        newInfo.joinCode = 'VAIHDA KOODI'
        await newInfo.save()
    }


    const adminData = {
        bulletins: info[0].bulletins,
        adminList: withAdminRightSafeList,
        joinCode: info[0].joinCode
    }

    response.status(200).json(adminData)
})

infoRouter.post('/add-bulletin', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }
    
    const all = await Info.find({})
    const info = all[0]
    info.bulletins.push(request.body.bulletin)
    info.save() 

    response.status(200).send('Tiedote lisätty!')
})

infoRouter.post('/delete-bulletin', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    const all = await Info.find({})
    const info = all[0]

    const newBulletins = info.bulletins.filter(bulletin => {
        if (bulletin !== request.body.bulletin) {
            return bulletin
        }
    })
    info.bulletins = newBulletins
    info.save()
    response.status(200).send()
})

module.exports = infoRouter