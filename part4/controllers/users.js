const usersRoutes = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoutes.get('/', async (request, response) => {
  const users = await User.find()
  response.json(users)
})

usersRoutes.post('/', async (request, response) => {
  const user = new User(request.body)

  if (_.isUndefined(user.username) || _.isUndefined(user.password)) {
    return response.status(400).json({ error: 'username or password undefined' })
  }

  user.passwordHash = await bcrypt.hash(user.passwordHash, 10)

  const result = await user.save()
  response.status(201).json(result)
})

module.exports = usersRoutes
