const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {Schema, model} = mongoose;

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error(err));

const personScheme = new Schema({
  name: {type: String, required: true, unique: true},
  number: {type: String, required: true},
});

personScheme.plugin(uniqueValidator);

personScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = new model('Person', personScheme);