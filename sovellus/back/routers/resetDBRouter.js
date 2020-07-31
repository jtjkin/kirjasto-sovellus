const resetDBRouter = require('express').Router()
const Book = require('../models/books')
const User = require('../models/user')

resetDBRouter.post('/reset', async (request, response) => {
  await Book.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = resetDBRouter