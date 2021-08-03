const testingRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRoutes.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = testingRoutes
