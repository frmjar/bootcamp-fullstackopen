const blogRoutes = require('express').Router()
const _ = require('lodash')
const Blog = require('../models/blog')

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  console.info(blog.title)
  console.info(blog.url)
  if (_.isUndefined(blog.title) || _.isUndefined(blog.url)) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  if (_.isUndefined(blog.likes)) { blog.likes = 0 }

  const result = await blog.save()
  response.status(201).json(result)
})

blogRoutes.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate({ _id: request.params.id }, request.body)
  response.status(200).json(blog)
})

blogRoutes.delete('/:id', async (request, response) => {
  await Blog.deleteOne({ _id: request.params.id })
  response.status(204).end()
})

module.exports = blogRoutes
