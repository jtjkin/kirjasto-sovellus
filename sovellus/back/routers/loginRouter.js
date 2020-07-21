const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ email: body.email})

    const passwordCorrect =
        user === null
        ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'Sähköpostiosoite tai salasana on väärin.'
        })
    }

    const userForToken = {
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_MASTER_PASSWORD)

    response
        .status(200)
        .send(
            {
                token,
                id: user.id,
                role: user.role,
                loans: user.loans,
                reservations: user.reservations,
                returnRequests: user.returnRequests
            }
        )
})

module.exports = loginRouter