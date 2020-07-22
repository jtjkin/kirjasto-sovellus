const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const DB_JOIN_CODE = 'liittymiskoodi'
//TODO
//liittymiskoodi tietokantaan
//api liittymiskoodin muuttamiseen admin-oikeuksisille

//TODO
//salasanan muuttaminen

//TODO
//tarkista token pyyntöjen yhteydessä

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10

    const joinCode = body.joinCode

    if (joinCode !== DB_JOIN_CODE) {
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

    const returnedUser = {id: savedUser.id}

    response.json(returnedUser)
})

module.exports = userRouter