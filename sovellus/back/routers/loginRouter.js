const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.get('/ping', (request, response) => {
    response.status(200).send('pong')
})

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ email: body.email})

    const passwordCorrect =
        user === null
        ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).send('Sähköpostiosoite tai salasana on väärin.')
    }

    const userForToken = {
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_MASTER_PASSWORD)

    response.status(200).send({token, id: user.id})
})

module.exports = loginRouter