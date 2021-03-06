const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Info = require('../models/info')
const dataStripper = require('../utils/dataStripper')
const stringSimilarity = require('string-similarity')
const mailer = require('../utils/mailer')
const rateLimit = require('express-rate-limit')


// For getting info about other users.
userRouter.post('/user', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const foundUser = await User.findById(request.body.id)

    if (decodedToken.admin) {
        return response.status(200).json(foundUser.toJSON)
    }

    const safeUser = dataStripper.userData(foundUser)

    return response.status(200).json(safeUser)
})



// For getting currently logged in user info.
userRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)
        .populate('loans', {title: 1, authorsShort: 1, publicationYear: 1, borrowDate: 1})
        .populate('reservations', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('returnRequests', {title: 1, authorsShort: 1, publicationYear: 1, reserver: 1})
        .populate('arrivedReservations', {title: 1, authorsShort: 1, publicationYear: 1})

    const ip = request.ip.toString()

    if (!user.ips.includes(ip)) {
        await User.findByIdAndUpdate(user.id, {ips: user.ips.concat(ip)})
    }
    
    const safeData = dataStripper.reserverInfoRemover(user)

    return response.status(200).send(safeData.toJSON())
})


// For updating user password or user role.
userRouter.post('/update-user', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (user.email === 'demo@demo.demo') {
        if (request.body.newPassword) {
            return response.status(200).send('Salasana päivitetty!')
        }

        if (request.body.newRole) {
            return response.status(200).send('Rooli päivitetty!')
        }
    }

    if(request.body.newPassword) {
        const passwordCorrect =
            user === null
            ? false : await bcrypt.compare(request.body.oldPassword, user.passwordHash)

        if (!passwordCorrect) {
            return response.status(401).send('Vanha salasana ei ole oikein. Tarkista salasana.')
        }

        const saltRounds = 10
        const NewPasswordHash = await bcrypt.hash(request.body.newPassword, saltRounds)

        const newUser = await User.findByIdAndUpdate(user.id, {passwordHash: NewPasswordHash})
        
        return response.status(200).send('Salasana päivitetty!')
    }

    if (request.body.newRole) {
        const newUser = await User.findByIdAndUpdate(user.id, {role: request.body.newRole})
        return response.status(200).send('Rooli päivitetty!')
    }
})


// Adding new user.
const addUserRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3
})

userRouter.post('/', addUserRateLimiter, async (request, response) => {
    if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
        return response.status(404).send()
    }

    const body = request.body
    const saltRounds = 10

    const info = await Info.find({})

    let DB_JOIN_CODE = ''

    if (info.length === 0) {
        const newInfo = new Info()
        newInfo.joinCode = 'VAIHDA KOODI'
        newInfo.lastBackUp = new Date().getTime()
        await newInfo.save()
    }

    if (!info[0]) {
        const newJoinCode = await Info.find({})
        DB_JOIN_CODE = newJoinCode[0].joinCode
    } else {
        DB_JOIN_CODE = info[0].joinCode
    }

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
                error: 'Käyttäjä on jo olemassa. Unohditko salasanasi?'
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
            canAddBooks: true,
            deniedBorrowing: false,
            ips: [request.ip]
        }
    )

    const allUsers = await User.find({})

    if (allUsers.length === 0) {
        user.admin = true
    }

    const savedUser = await user.save()
    const safeUser = savedUser.toJSON()

    const userForToken = {
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_MASTER_PASSWORD)

    safeUser.id = savedUser.id
    safeUser.token = token

    response.status(200).json(safeUser)
})

userRouter.post('/remove-admin', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    if (user.email === 'demo@demo.demo') {
        return response.status(200).send('Admin-oikeudet poistettu.')
    }

    const withAdminRight = await User.find({admin: true})

    if (withAdminRight.length === 1) {
        return response.status(401).send('Viimeistä admin-oikeutta ei voida poistaa.')
    }

    const adminRemoved = await User.findByIdAndUpdate(request.body.id, {admin: false})

    const all = await Info.find({})
    const info = all[0]
    const date = new Date()
    const activityEntry = `${date}; ${user.name}, ${user.email}, ${user.id}; Admin rights removed from ${adminRemoved.name}, ${adminRemoved.id}`
    info.adminActivity.push(activityEntry)
    info.save()
    
    response.status(200).send('Admin-oikeudet poistettu.')
})

userRouter.post('/find-user-name', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    const giveAdminRight = await User.find({name: request.body.name})
    

    if (giveAdminRight[0]) {
        return response.status(200).json(
            {
                exact: true, 
                name: giveAdminRight[0].name,
                id: giveAdminRight[0].id
            })
    }

    const listOfUsers = await User.find({})

    const similarity = listOfUsers.map(user => {
        const similarityRate = stringSimilarity.compareTwoStrings(user.name.toLowerCase(), request.body.name.toLowerCase()) 
        return {
            user,
            similarityRate: similarityRate
        }
    })

    const sortedUsers = similarity.sort((a, b) => b.similarityRate - a.similarityRate)

    response.status(200).json(
        {
            exact: false,
            name: sortedUsers[0].user.name,
            id: sortedUsers[0].user.id
        })
})

userRouter.post('/add-admin', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    if (user.email === 'demo@demo.demo') {
        return response.status(200).send()
    }

    const userNewAdmin = await User.findByIdAndUpdate(request.body.id, {admin: true}, {new: 1})

    const all = await Info.find({})
    const info = all[0]
    const date = new Date()
    const activityEntry = `${date}; ${user.name}, ${user.email}, ${user.id}; Admin rights added to ${userNewAdmin.name}, ${userNewAdmin.id}`
    info.adminActivity.push(activityEntry)
    info.save()

    response.status(200).send()
})


const forgottenPasswordRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2
})

userRouter.post('/forgotten-password', forgottenPasswordRateLimiter, async (request, response) => {
    if (request.body.email === 'demo@demo.fi') {
        response.status(200).send('Uusi salasana on lähetetty sähköpostiin.')
    }
   
    const ip = request.ip

    const all = await Info.find({})
    const info = all[0]
    const date = new Date()
    info.forgottenPasswordActivity = info.forgottenPasswordActivity.concat(`${date}; ${ip}; ${request.body.email}`)
    info.save()

    const user = await User.find({email: request.body.email})

    if (user.length === 0) {
        return response.status(200).send('Jotakin meni pieleen. Tarkista sähköpostiosoite tai yritä myöhemmin uudelleen')
    }

    console.log(user)
    const random = Math.floor(Math.random() * 9999999); 

    mailer.sendForgottenPasswordMessageTo({user: user[0], password: random})

    const saltRounds = 10
    const NewPasswordHash = await bcrypt.hash(random.toString(), saltRounds)

    await User.findByIdAndUpdate(user[0].id, {passwordHash: NewPasswordHash})

    response.status(200).send('Uusi salasana on lähetetty sähköpostiin')
})

module.exports = userRouter