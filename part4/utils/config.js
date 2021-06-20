require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI
const PORT = process.env.PORT || 3003

module.exports =
  {
    mongoUrl,
    PORT
  }
