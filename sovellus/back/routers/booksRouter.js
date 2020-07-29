const booksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const { bookStatus } = require('../utils/config')
const Book = require('../models/books')
const User = require('../models/user')
const stringSimilarity = require('string-similarity')
const dataStripper = require('../utils/dataStripper')
const mailer = require('../utils/mailer')

//REMOVE
const testData = require('../testData.json')
const { defaultMaxListeners } = require('nodemailer/lib/mailer')

//TODO
//Muuta siten, että hakee käyttäjän peruskirjatiedot
booksRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    response.send(testData)
})

booksRouter.get('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const book = await Book.findById(request.params.id)

    //TODO
    //populate lainaajan ja varaajan tiedoilla

    if (book) {
        const safeBook = dataStripper.bookData(book)
        response.json(safeBook)
      } else {
        response.status(404).end()
      }
})

booksRouter.post('/search-isbn', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const xmlData = await axios.get(`http://lx2.loc.gov:210/lcdb?version=1.1&operation=searchRetrieve&query=bath.isbn=${request.body.isbn}&maximumRecords=1&recordSchema=mods`)

    parser.parseString(xmlData.data, (error, result) => {
        if (error) {
            console.log(error)
        }

        const json = result['zs:searchRetrieveResponse']

        if (Number(json['zs:numberOfRecords'][0]) === 0) {
            return response.status(400).send('ISBN:ää ei löydy. Lisää tiedot manuaalisesti.')
        }

        if (Number(json['zs:numberOfRecords'][0]) === 1) {
            const book = result['zs:searchRetrieveResponse']
                ['zs:records'][0]['zs:record'][0]['zs:recordData'][0]['mods'][0]
            
            const getTitle = book.titleInfo[0]
            let title = getTitle.title[0]
            
            if(getTitle.subTitle !== undefined) {
                if (getTitle.subTitle.length > 0) {
                    const subtitle = getTitle.subTitle[0]
                    title += ' – ' + subtitle
                }
            }

            const getAuthors = book.name
            let authorsShort = ''
            let authors = ''
            let personalAuthorIndeces = []

            for (let i = 0; i < getAuthors.length; i++) {

                if(getAuthors[i].$.type === 'personal') {
                    personalAuthorIndeces.push(i)
                }
            }

            if (personalAuthorIndeces.length > 2) {
                const firstAuthor = getAuthors[0].namePart[0]
                let comma = firstAuthor.indexOf(',')
                authorsShort = firstAuthor.substring(0, comma) + ' et al.'
            }

            for (let i = 0; i < personalAuthorIndeces.length; i++) {
                if (personalAuthorIndeces.length === 1) {
                    authors += getAuthors[personalAuthorIndeces[i]].namePart[0]
                    break
                }

                if (i === personalAuthorIndeces.length - 2) {
                    authors += getAuthors[personalAuthorIndeces[i]].namePart[0]
                    continue
                }
                if(i === getAuthors.length - 1) {
                    authors += ' & ' + getAuthors[personalAuthorIndeces[i]].namePart[0]
                    continue
                }

                authors += getAuthors[personalAuthorIndeces[i]].namePart[0] + '; '
            }

            let publicationYear = ''
            let publisher = ''

            if (book.originInfo[0].dateIssued[0]._ !== undefined) {
                publicationYear = book.originInfo[0].dateIssued[0]._
            }

            if (book.originInfo[0].dateIssued.length > 1) {
                publicationYear = book.originInfo[0].dateIssued[1]._
            }

            if (book.originInfo[0].publisher[0] !== undefined) {
                publisher = book.originInfo[0].publisher[0]
            }
            
            //const jsonString = JSON.stringify(getAuthors, null, 4)

            const foundBook = {
                title,
                authorsShort,
                authors,
                publicationYear,
                publisher
            }
            //console.log('searchISBN',foundBook)
            return response.status(200).send(foundBook)
        }
        
        if (Number(json['zs:numberOfRecords'][0]) > 1) {
            return response.status(400).send('Samalla ISBN:llä löytyy useampi nimike. Pyyntöä ei voida käsitellä.')
        }
    })
})

booksRouter.post('/add-book', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    let body = request.body

    const currentYear = new Date().getFullYear()

    if (Number(body.publicationYear) === currentYear + 2) {
        return response.status(400).send(`Oletko aikamatkustaja, vai mistä olet saanut kirjan joka julkaistaan vasta vuonna ${body.publicationYear}?`)
    }

    if (Number(body.publicationYear) < 0) {
        return response.status(400).send(`Hyvänen aika, kivikautista kirjallisuutta! Tämä on sensaatio! Tai sitten yritit lyödä vuosiluvuksi miinuksen...`)
    }

    if (Number(body.publicationYear) < 1200) {
        return response.status(400).send(`Mahdollista tietysti, jotkin dokumentit ajoittuvat meikäläisittäin rautakaudelle, mutta jotenkin epäilen, että kirjaa, joka on julkaistu vuonna ${body.publicationYear} lähdettäisiin ihan ensimmäisenä tallentamaan käsikirjastoon.`)
    }

    

    const bookExists = await Book.findOne({title: body.title})

    if (bookExists) {
        return response.status(400).send('Kirja on jo tietokannassa.')
    }

    const allBooks = await Book.find({})

    const foundSimilar = allBooks.some(book => {
        const similar = stringSimilarity.compareTwoStrings(book.title, body.title) 
        if (similar > 0.95) {
            return book.title
        }
    })

    if (foundSimilar) {
        return response.status(400).send(`Tietokannasta löytyy jo lähes samanniminen kirja: ${foundSimilar}.` )
    }

    if (!body.authorsShort) {
        //TODO
        //pätki kirjoittajille lyhyt muoto (variaatioiden hallinta?)
        body.authorsShort = body.author
    }

    body.addedBy = {
        userId: decodedToken.id,
        date: new Date()
    }

    const newBook = new Book(body)
    const savedBook = await newBook.save()
    const safeBook = dataStripper.bookData(savedBook)

    response.status(200).json(safeBook)
})

booksRouter.post('/borrow', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)

    if (user.deniedBorrowing) {
        return response.status(401).send('Lainaaminen estetty. Ota yhteyttä vastuuhenkilöön.')
    }

    //TODO
    //jos lainataan varauksessa oleva kirja laina onnistuu, 
    //mutta lainauksesta lähtee tieto varaajalle

    //TODO
    //miten lainata lainattu kirja joka hyllyssä, mutta ei merkitty palautetuksi?


    const book = await Book.findById(request.body.id)

    if(book.status === bookStatus.BORROWED) {
        return response.status(401).send('Lainaaminen estetty, kirja on jo lainassa.')
    }

    const newBorrower = {
        borrowDate: new Date(),
        userId: user.id
    }

    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        {
            status: bookStatus.BORROWED,
            borrower: newBorrower
        }, {new: true})

    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
            loans: user.loans.concat(updatedBook)
        }, {new: true})

    const safeUser = dataStripper.userData(updatedUser)
    const safeBook = dataStripper.bookData(updatedBook)

    return response.status(200).json({updatedBook: safeBook, updatedUser: safeUser})
})

booksRouter.post('/return', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)
    const book = await Book.findById(request.body.id)

    const newLoans = user.loans.filter(loan => {
        const string = loan.toString()
        return book.id !== string
    })
    
    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
            loans: newLoans
        }, {new: true})

    let bookHasReservations = false

    if (book.reserver.length > 0) {
        bookHasReservations = true

        //TODO
        //s-posti kaikille vai ensimmäiselle?
        //jos ensimmäinen ei hae tietyn ajan kuluessa, lähetä seuraavalle?
        mailer.sendBookAvailableMessageTo({user: book.reserver[0], book: book})
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        {
            status: bookHasReservations ? bookStatus.RESERVED : bookStatus.FREE,
            borrower: {}
        }, {new: true})
    
    const safeUser = dataStripper.userData(updatedUser)
    const safeBook = dataStripper.bookData(updatedBook)

    return response.status(200).json({updatedBook: safeBook, updatedUser: safeUser})
})

booksRouter.post('/reserve', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)
    const book = await Book.findById(request.body.id)

    const newReserver = {
        borrowDate: new Date(),
        userId: user.id
    }

    //TODO
    //Tekee newReserveristä objectin jolle antaa ylimääräisen id:n
    //+ Date() puuttuu
    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        { reserver: book.reserver.concat(newReserver) }, {new: true})
    
    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
            reservations: user.reservations.concat(updatedBook)
        }, {new: true})

    const safeUser = dataStripper.userData(updatedUser)
    const safeBook = dataStripper.bookData(updatedBook)

    return response.status(200).json({updatedBook: safeBook, updatedUser: safeUser})
})

//TODO
//Poista varaus

//TODO
//tietokantaan logi, joka seuraa palautus-varaus-lainauksia ja etsii väärinkäytöksiä

module.exports = booksRouter