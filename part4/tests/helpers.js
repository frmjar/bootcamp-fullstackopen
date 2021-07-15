const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

const usersInMongo = () => User.find({}).then(response => {
  return response.map((user) => user.toJSON())
})

const blogsInMongo = () => Blog.find({}).then(response => {
  return response.map((blog) => blog.toJSON())
})

const userLoggingIn = (user) => {
  const forToken = {
    id: user._id,
    username: user.username
  }

  return jwt.sign(forToken, JWT_SECRET)
}

module.exports = {
  usersInMongo,
  blogsInMongo,
  userLoggingIn
}
