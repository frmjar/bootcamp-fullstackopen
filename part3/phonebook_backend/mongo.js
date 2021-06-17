const mongoose = require('mongoose')
const { Schema, model } = mongoose

const params = process.argv

if (params.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (params.length === 4 || params.length > 5) {
  console.log(
    'Use: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = params[2]
const mongo_uri = `mongodb+srv://superadmin:${password}@cluster0.owpvn.mongodb.net/bootcamp?retryWrites=true&w=majority`

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

const PersonScheme = new Schema({
  name: String,
  number: String
})

// eslint-disable-next-line new-cap
const Person = new model('Person', PersonScheme)

if (params.length === 5) {
  const person = new Person({
    name: params[3],
    number: params[4]
  })

  person.save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
        .then(() => console.log('Console connection closed'))
    })
    .catch(err => console.error(err))
}

if (params.length === 3) {
  Person.find()
    .then(result => {
      console.log('Phonebook')
      result.forEach(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
        .then(() => console.log('Console connection closed'))
    })
    .catch(err => console.error(err))
}
