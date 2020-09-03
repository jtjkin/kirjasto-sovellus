const jwt = require('jsonwebtoken')
const infoRouter = require('express').Router()
const Info = require('../models/info')
const User = require('../models/user')
const Book = require('../models/books')
const dataStripper = require('../utils/dataStripper')
const mailer = require('../utils/mailer')
const userRouter = require('./userRouter')



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

    if (user.email === 'demo@demo.demo') {
        return response.status(200).send()
    }

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

    if (user.email === 'demo@demo.demo') {
        const demoData = {
            bulletins: [
                'Demossa ei voi muokata admin- tai käyttäjätietoja.',
                'Voit kuitenkin lisätä ja muokata kirjojen tietoja, mutta muutokset eivät päivity tietokantaan.'
            ],
            adminList: [],
            joinCode: 'Liittymiskoodin muuttaminen',
            numberOfBooks: 6,
            numberOfUsers: 5,
            mostLoans: 2,
            loanTimeMost: 3.15,
            loanTimeTotal: 16.23
        }
        return response.status(200).json(demoData)
    }

    if (!user.admin) {
        return response.status(401).send('Ei admin-oikeuksia.')
    }

    const withAdminRights = await User.find({admin: true})
    const withAdminRightSafeList = dataStripper.justNamesAndRolesList(withAdminRights)

    const info = await Info.find({})

    if (info.length === 0) {
        const newInfo = new Info()
        newInfo.joinCode = 'VAIHDA KOODI'
        newInfo.lastBackUp = new Date().getTime()
        await newInfo.save()
    }

    const numberOfBooks = await Book.countDocuments({})
    const numberOfUsers = await User.countDocuments({})

    const users = await User.find({}).populate('loans', {borrowDate: 1})

    let mostLoans = 0
    let index = 0
    let loanTimeTotal = 0

    const currentDate = new Date().getTime()

    for(let i = 0; i < users.length; i++) {
        if (users[i].loans.length > mostLoans) {
            index = i
            mostLoans = users[i].loans.length
        }

        users[i].loans.forEach(book => {
            let usersLoanTime = 0
            usersLoanTime += currentDate - Date.parse(book.borrowDate)
            loanTimeTotal += usersLoanTime
        })
    }

    let loanTimeMost = 0
    users[index].loans.forEach(book => {
        loanTimeMost += currentDate - Date.parse(book.borrowDate)
    })

    const day = 60 * 60 *24 * 1000

    const adminData = {
        bulletins: info[0].bulletins,
        adminList: withAdminRightSafeList,
        joinCode: info[0].joinCode,
        numberOfBooks: numberOfBooks,
        numberOfUsers: numberOfUsers,
        mostLoans: mostLoans,
        loanTimeMost: (loanTimeMost / day).toFixed(2),
        loanTimeTotal: (loanTimeTotal / day).toFixed(2)
    }

    //Backup
    const date = new Date().getTime()
    if (date - info[0].lastBackUp - 2592000000 > 0) { //every 1 month (30 days)
        const books = await Book.find({})
        mailer.sendBackUp({books})
        info[0].lastBackUp = date
        await info.save()
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

    if (user.email === 'demo@demo.demo') {
        return response.status(200).send('Tiedote lisätty!')
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

    if (user.email === 'demo@demo.demo') {
        return response.status(200).send()
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