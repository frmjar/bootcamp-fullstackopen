const blogRoutes = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

const extractToken = (token) => _.isNil(token) ? null : token.substring(7)

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user', { _id: 1, username: 1, name: 1 })
  response.json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const token = extractToken(request.get('authorization'))
  const tokenDesencrypted = jwt.verify(token, JWT_SECRET)

  if (!tokenDesencrypted.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog(request.body)
  if (_.isUndefined(blog.title) || _.isUndefined(blog.url)) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  if (_.isUndefined(blog.likes)) { blog.likes = 0 }

  const user = await User.findOne({ _id: tokenDesencrypted.id })
  blog.user = tokenDesencrypted.id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  user.save()

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
