const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const blogRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const { mongoUrl } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)

app.use(middleware.errorHandler)

module.exports = { app, mongoose }
