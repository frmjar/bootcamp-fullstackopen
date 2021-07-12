const logger = require('./logger')
const _ = require('lodash')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const token = request.get('authorization')
  const extractToken = _.isNil(token) || !token.toLowerCase().startsWith('bearer ') ? null : token.substring(7)
  request.token = extractToken

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
