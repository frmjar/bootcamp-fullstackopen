require('dotenv').config()

const mongoUrl = process.env.MONGO_URI
const PORT = process.env.PORT || 3003

module.exports =
  {
    mongoUrl,
    PORT
  }
