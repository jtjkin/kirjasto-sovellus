const booksRouter = require('express').Router()

//REMOVE
const testData = require('../testData.json')

booksRouter.get('/', async (req, res) => {
    res.send(testData)
})

//TODO
//jos lainataan varauksessa oleva kirja laina onnistuu, 
//mutta lainauksesta lähtee tieto varaajalle

module.exports = booksRouter