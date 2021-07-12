const loginRoutes = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { JWT_SECRET } = require('../utils/config')
const User = require('../models/user')

loginRoutes.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const corretPassword = _.isNil(user)
    ? null
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!corretPassword) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const forToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(forToken, JWT_SECRET)

  response.status(200).send({ token, name: user.name, username: user.username })
})

module.exports = loginRoutes
