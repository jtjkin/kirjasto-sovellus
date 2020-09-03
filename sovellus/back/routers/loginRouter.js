const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const rateLimit = require('express-rate-limit')

loginRouter.get('/ping', (request, response) => {
    response.status(200).send()
})

const addLoginRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10
})

loginRouter.post('/', addLoginRateLimiter, async (request, response) => {
    if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
        return response.status(404).send()
    }

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