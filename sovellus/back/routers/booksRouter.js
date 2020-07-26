const booksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const bookStatus = require('../utils/config')
const Book = require('../models/books')
const stringSimilarity = require('string-similarity')

//REMOVE
const testData = require('../testData.json')

booksRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_MASTER_PASSWORD)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).send('Pyynnön validointi epäonnistui. Tarkista käyttöoikeutesi.')
    }

    response.send(testData)
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

    const newBook = new Book(body)
    const savedBook = await newBook.save()

    response.status(200).json(savedBook)
})

//TODO
//jos lainataan varauksessa oleva kirja laina onnistuu, 
//mutta lainauksesta lähtee tieto varaajalle

module.exports = booksRouter