const User = require('../models/user')
const Blog = require('../models/blog')

const usersInMongo = () => User.find({}).then(response => response)
const blogsInMongo = () => Blog.find({}).then(response => response)

module.exports = {
  usersInMongo,
  blogsInMongo
}
