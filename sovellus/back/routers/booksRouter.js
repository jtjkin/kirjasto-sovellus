const booksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

//REMOVE
const testData = require('../testData.json')
const { response } = require('express')

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

    const xmlData = await axios.get(`http://lx2.loc.gov:210/lcdb?version=1.1&operation=searchRetrieve&query=bath.isbn=${request.isbn}&maximumRecords=1&recordSchema=mods`)

    parser.parseString(xmlData.data, (error, result) => {
        if (error) {
            console.log(error)
        }

        const json = result['zs:searchRetrieveResponse']

        if (Number(json['zs:numberOfRecords'][0]) === 0) {
            return response.status(400).send('ISBN:ää ei löydy')
        }

        if (Number(json['zs:numberOfRecords'][0]) === 1) {
            const book = result['zs:searchRetrieveResponse']
                ['zs:records'][0]['zs:record'][0]['zs:recordData'][0]['mods'][0]
            
            const getTitle = book.titleInfo[0]
            let title = getTitle.title[0]
            
            if (getTitle.subTitle.length > 0) {
                const subtitle = getTitle.subTitle[0]
                title += ' – ' + subtitle
            }

            const getAuthors = book.name
            let authorsShort = ''
            let authors = ''

            if (getAuthors.length > 2) {
                const firstAuthor = getAuthors[0].namePart[0]
                let comma = firstAuthor.indexOf(',')
                authorsShort = firstAuthor.substring(0, comma) + ' et al.'
            }

            for (let i = 0; i < getAuthors.length; i++) {
                if (i === getAuthors.length - 2) {
                    authors += getAuthors[i].namePart[0]
                    continue
                }
                if(i === getAuthors.length - 1) {
                    authors += ' & ' + getAuthors[i].namePart[0]
                    continue
                }

                authors += getAuthors[i].namePart[0] + '; '
            }

            const publicationYear = book.originInfo[0].dateIssued[0]._
            const publisher = book.originInfo[1].publisher[0]
            
            //const jsonString = JSON.stringify(getAuthors, null, 4)

            const foundBook = {
                title,
                authorsShort,
                authors,
                publicationYear,
                publisher
            }

            return response.status(200).send(foundBook)
        }
        
        if (Number(json['zs:numberOfRecords'][0]) > 1) {
            return response.status(400).send('Samalla ISBN:llä löytyy useampi nimike. Pyyntöä ei voida käsitellä.')
        }
    })
})

booksRouter.post('add-book', async (request, response) => {

    response.status(200).json({book: 'book'})
})

booksRouter.get('/data', async (req,res) => {
    res.json(POISTA)
})

//TODO
//jos lainataan varauksessa oleva kirja laina onnistuu, 
//mutta lainauksesta lähtee tieto varaajalle

module.exports = booksRouter