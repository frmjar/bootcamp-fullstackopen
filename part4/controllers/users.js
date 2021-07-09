const usersRoutes = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoutes.get('/', async (request, response) => {
  const users = await User.find()
  response.json(users)
})

usersRoutes.post('/', async (request, response) => {
  const userBody = request.body

  if (_.isUndefined(userBody.username) || _.isUndefined(userBody.password)) {
    return response.status(400).json({ error: 'username or password undefined' })
  }
  if (userBody.password.length < 3) {
    return response.status(400).json({ error: 'the password must be at least 3 characters long' })
  }

  userBody.password = await bcrypt.hash(userBody.password, 10)

  const user = new User(userBody)
  user.passwordHash = userBody.password

  const result = await user.save()
  response.status(201).json(result)
})

module.exports = usersRoutes
