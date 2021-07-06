const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/users')
const { mongoUrl } = require('./utils/config')
const logger = require('./utils/logger')

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

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

module.exports = { app, mongoose }
