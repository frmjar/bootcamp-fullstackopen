const testingRoutes = require('express').Router()
const Blog = require('../models/blog')

testingRoutes.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

module.exports = testingRoutes
