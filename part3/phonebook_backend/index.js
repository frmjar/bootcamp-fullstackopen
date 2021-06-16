const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person.js');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('data', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/info', async (request, response) => {
  const date = new Date();
  const countDocuments = await Person.estimatedDocumentCount();
  response.send(
      `<div>
                <span>Phonebook has info for ${countDocuments} people</span>
                <p>${date.toISOString()} (ISO)</p>
            </div>`);
});

app.get('/api/persons', (request, response, next) => {

  Person.find()
        .then(result => response.json(result))
        .catch(err => {
          console.error(err);
          next(err);
        });

});

app.post('/api/persons', (request, response, next) => {
  const person = request.body;

  if (!person.name || !person.number)
    return response.status(400).json({
      error: 'Name or number missing',
    });

  /*if (persons.find(per => per.name === person.name))
    return response.status(409).json({
      error: 'Name must be unique',
    });*/

  const person_mongo = new Person({
    name: person.name,
    number: person.number,
  });

  person_mongo.save()
              .then(person => response.json(person))
              .catch(err => {
                if (err.name === 'ValidationError') {
                  return response.status(409).json({
                    error: err.message,
                  });
                } else {
                  console.error(err);
                  next(err);
                }
              });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
        .then(person => response.json(person))
        .catch(err => {
          console.error(err);
          next(err);
        });
});

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id,
      {$set: {number: request.body.number}}, {new: true})
        .then(person => response.json(person))
        .catch(err => {
          console.error(err);
          next(err);
        });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.deleteOne({'_id': request.params.id})
        .then(() => response.status(204).end())
        .catch(err => {
          console.error(err);
          next(err);
        });
});

app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  }

  next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
