const blogRoutes = require('express').Router()
const _ = require('lodash')
const Blog = require('../models/blog')

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (_.isUndefined(blog.likes)) { blog.likes = 0 }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRoutes
