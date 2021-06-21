require('dotenv').config()

const entorno = process.env.NODE_ENV
const mongoUrl = entorno === 'development' || entorno === 'test' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI
const PORT = process.env.PORT || 3003

module.exports =
  {
    mongoUrl,
    PORT
  }
