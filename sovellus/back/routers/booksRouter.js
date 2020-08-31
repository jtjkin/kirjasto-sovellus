const booksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const { bookStatus } = require('../utils/config')
const Book = require('../models/books')
const User = require('../models/user')
const stringSimilarity = require('string-similarity')
const mailer = require('../utils/mailer')
const dataStripper = require('../utils/dataStripper')

booksRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const books = await Book.find({})

    const exactFinds = books.filter(book => {
        if (book.title.toLowerCase === request.body.searchterms.toLowerCase || 
            book.author.toLowerCase === request.body.searchterms.toLowerCase ||
            book.authorsShort.toLowerCase === request.body.searchterms.toLowerCase) {
                return book
            }
    })

    if (exactFinds.lenght > 0) {
        const safeBooks = exactFinds.map(book => dataStripper.bookShortList(book))
        return response.status(200).json({exact: true, notFound: false, books: safeBooks})
    }

    const searchedBooks = books.map(book => {
        const titleSimilarity = stringSimilarity.compareTwoStrings(book.title.toLowerCase(), request.body.searchterms.toLowerCase())
        const authorSimilarity = stringSimilarity.compareTwoStrings(book.author.toLowerCase(), request.body.searchterms.toLowerCase())
        return {
                titleSimilarity: titleSimilarity,
                authorSimilarity: authorSimilarity,
                book
            }
    })

    const sortedBooks = searchedBooks.sort((a, b) => (b.titleSimilarity + b.authorSimilarity) - (a.titleSimilarity + a.authorSimilarity))
    
    if (sortedBooks[0].titleSimilarity === 0 && sortedBooks[0].authorSimilarity === 0) {
        const similarityRemoved = sortedBooks.map(book => book.book)
        const safeBooks = similarityRemoved.map(book => dataStripper.bookShortList(book))
        return response.status(200).json({exact: false, notFound: true, books: []})
    }

    if (sortedBooks.length < 10) {
        const similarityRemoved = sortedBooks.map(book => book.book)
        const safeBooks = similarityRemoved.map(book => dataStripper.bookShortList(book))
        return response.status(200).json({exact: false, notFound: false, books: safeBooks})
    }

    const firstTenResults = sortedBooks.slice(0, 10)

    const similarityRemoved = firstTenResults.map(book => book.book)

    const safeBooks = similarityRemoved.map(book => dataStripper.bookShortList(book))
    response.status(200).json({exact: false, notFound: false, books: safeBooks})
})

booksRouter.get('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    let book = {}
    try {
        book = await Book.findById(request.params.id).populate('borrower', {name: 1, id: 1, role: 1})
    } catch {
        return response.status(404).end()
    }

    if (book) {
        return response.json(dataStripper.bookDataWithBorrowerInfo(book))
    }

    response.status(404).end()
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

        //TODO:
        //lähettää statuksen, mutta ei muuta.
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

    response.status(200).json(savedBook.toJSON())
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
    //miten lainata lainattu kirja joka hyllyssä, mutta ei merkitty palautetuksi?

    const book = await Book.findById(request.body.id)

    if(book.status === bookStatus.BORROWED) {
        return response.status(401).send('Lainaaminen estetty, kirja on jo lainassa.')
    }

    const newUserReservations = user.reservations.filter(
        reservation => reservation.toString() !== book.id
    )

    const newBookReservations = book.reserver.filter(
        reservation => reservation.userId.toString() !== user.id
    )

    const newArrivedReservations = user.arrivedReservations.filter(
        arrived => arrived.toString() !== book.id
    )

    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        {
            status: bookStatus.BORROWED,
            borrower: user.id,
            borrowDate: new Date(),
            reserver: newBookReservations
        }, {new: true}).populate('borrower', {name: 1, id: 1}
    )

    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
            loans: user.loans.concat(updatedBook),
            reservations: newUserReservations,
            arrivedReservations: newArrivedReservations
        }, {new: true})
        .populate('loans', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('reservations', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('returnRequests', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('arrivedReservations', {title: 1, authorsShort: 1, publicationYear: 1}
    )

    //removes the book from other users arrived reservations -list
    if (newBookReservations.length > 0) {

        newBookReservations.forEach( async (user) => {
            const userToBeUpdated = await User.findById(user.userId) 

            if(userToBeUpdated) {
                const newArrivedList = userToBeUpdated.arrivedReservations.filter(
                    arrivedBook => arrivedBook.toString() !== book.id
                )

                const updatedOtherUser = await User.findByIdAndUpdate(
                    userToBeUpdated.id,
                    {
                        arrivedReservations: newArrivedList
                    }
                )
            }
        })
    }

    response.status(200).json(
        {
            updatedBook: dataStripper.bookDataWithBorrowerInfo(updatedBook), 
            updatedUser: updatedUser.toJSON()
        })
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
        .populate('loans', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('reservations', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('returnRequests', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('arrivedReservations', {title: 1, authorsShort: 1, publicationYear: 1})

    let bookHasReservations = false

    if (book.reserver.length > 0) {
        bookHasReservations = true

        //TODO
        //s-posti kaikille vai ensimmäiselle?
        //jos ensimmäinen ei hae tietyn ajan kuluessa, lähetä seuraavalle?

        const listOfReservatorIds = book.reserver.map(reservation => reservation.userId)

        await User.updateMany({ _id: { $in: listOfReservatorIds}}, { $push: {arrivedReservations: [book.id]}})

        mailer.sendBookAvailableMessageTo({user: book.reserver[0], book: book})
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        {
            status: bookHasReservations ? bookStatus.RESERVED : bookStatus.FREE,
            borrower: undefined,
            borrowDate: ''
        }, {new: true})

    response.status(200).json(
        {
            updatedBook: updatedBook.toJSON(), 
            updatedUser: updatedUser.toJSON()
        })
})

booksRouter.post('/reserve', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)
    const book = await Book.findById(request.body.id)

    const newReserver = {
        reserveDate: new Date(),
        userId: user
    }

    const updatedBook = await Book.findByIdAndUpdate(
        request.body.id, 
        { 
            reserver: book.reserver.concat(newReserver)
        }, {new: true}).populate('borrower', {name: 1, id: 1, role: 1})
    
    const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
            reservations: user.reservations.concat(updatedBook)
        }, {new: true})
        .populate('loans', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('reservations', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('returnRequests', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('arrivedReservations', {title: 1, authorsShort: 1, publicationYear: 1})

    const borrower = await User.findById(book.borrower)
    
    await User.findByIdAndUpdate(
        borrower.id,
        {
            returnRequests: borrower.returnRequests.concat(updatedBook)
        }
    )

    response.status(200).json(
        {
            updatedBook: dataStripper.bookDataWithBorrowerInfo(updatedBook), 
            updatedUser: updatedUser.toJSON()
        })
})

booksRouter.post('/cancel-reservation', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    const user = await User.findById(decodedToken.id)
    const book = await Book.findById(request.body.id)

    const newUserReservations = user.reservations.filter(reservation => 
        reservation.toString() !== book.id)

    const newBookReservers = book.reserver.filter(reservation => 
            reservation.userId.toString() !== user.id)

    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, 
        {
            reservations: newUserReservations
        }, {new: true})
        .populate('loans', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('reservations', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('returnRequests', {title: 1, authorsShort: 1, publicationYear: 1})
        .populate('arrivedReservations', {title: 1, authorsShort: 1, publicationYear: 1})
    
    const updatedBook = await Book.findByIdAndUpdate(request.body.id,
        {
            reserver: newBookReservers
        }, {new: true}).populate('borrower', {name: 1, id: 1, role: 1})

    const borrower = await User.findById(book.borrower)
    const newBorrowerReturnRequestList = borrower.returnRequests.filter(
        bookInList => String(bookInList) !== book.id)

    await User.findByIdAndUpdate(
        borrower.id,
        {
            returnRequests: newBorrowerReturnRequestList
        }
    )

    response.status(200).json(
        {
            updatedBook: dataStripper.bookDataWithBorrowerInfo(updatedBook), 
            updatedUser: updatedUser.toJSON()
        })
})

module.exports = booksRouter