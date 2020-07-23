const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dataStripper = require('../utils/dataStripper')

const DB_JOIN_CODE = 'liittymiskoodi'
//TODO
//liittymiskoodi tietokantaan
//api liittymiskoodin muuttamiseen admin-oikeuksisille

//TODO
//salasanan muuttaminen

userRouter.get('/', async (request, response) => {

    //refraktoi tokenin tarkistaminen
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }
    // 

    const user = await User.findById(decodedToken.id)
    const safeUser = dataStripper.userData(user)

    return response.status(200).send(safeUser)
})

userRouter.post('/update-user', async (request, response) => {
    //refraktoi tokenin tarkistaminen
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }
    //

    //JATKA HUOMENNA
    //salasanan tai roolin muutoksen käsittely
    //front: UPdatePersonalInfo -> responsen käsittely
})

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10

    if (body.joinCode !== DB_JOIN_CODE) {
        return response.status(400).json(
            {
                error: 'Liittymiskoodi ei ole oikein. Tarkista koodi.'
            }
        )
    }

    if(body.password.length < 8) {
        return response.status(400).json(
            {
                error: 'Salasanan tulee olla vähintään 8 merkkiä pitkä.'
            }
        )
    }

    if(!body.name) {
        return response.status(400).json(
            {
                error: 'Nimi on pakollinen tieto!'
            }
        )
    }

    if (!body.email) {
        return response.status(400).json(
            {
                error: 'Sähköpostiosoite on pakollinen tieto!'
            }
        )
    }

    const userExists = await User.findOne({email: body.email})

    if(userExists) {
        return response.status(400).json(
            {
                error: 'Käyttäjätunnus on jo olemassa. Unohditko salasanasi?'
            }
        )
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (!body.role) {
        body.role = 'perusopiskelija'
    }
    
    const user = new User(
        {
            name: body.name,
            role: body.role,
            email: body.email,
            passwordHash,
            admin: false,
            canAddBooks: false,
            deniedBorrowing: false
        }
    )

    if (body.role === 'tohtorikoulutettava' || 
        body.role === 'henkilökuntaa' ||
        body.role === 'post-doc') {
            user.canAddBooks = true
    }

    const savedUser = await user.save()
    const safeUser = dataStripper.userData(savedUser)

    const userForToken = {
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_MASTER_PASSWORD)

    safeUser.id = savedUser.id
    safeUser.token = token

    response.status(200).json(safeUser)
})

module.exports = userRouter