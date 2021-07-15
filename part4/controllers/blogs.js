const blogRoutes = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user', { _id: 1, username: 1, name: 1 })
  response.json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const tokenDesencrypted = jwt.verify(request.token, JWT_SECRET)

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
  const tokenDesencrypted = jwt.verify(request.token, JWT_SECRET)

  if (!tokenDesencrypted.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogPromise = Blog.findById(request.params.id)
  const userPromise = User.findById(tokenDesencrypted.id)

  const [blog, user] = await Promise.all([blogPromise, userPromise])

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'you cannot delete this blog' })
  }

  user.blogs = _.without(user.blogs, blog._id)

  const blogRemovePromise = blog.remove()
  const userBlogPromise = user.save()

  await Promise.all([blogRemovePromise, userBlogPromise])

  response.status(204).end()
})

module.exports = blogRoutes
