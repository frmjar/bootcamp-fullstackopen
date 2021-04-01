const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1,
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2,
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3,
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4,
  },
  {
    'name': 'hola',
    'number': '39-23-6423122',
    'id': 5,
  },
];

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
      `<div>
                <span>Phonebook has info for ${persons.length} people</span>
                <p>${date.toISOString()} (ISO)</p>
            </div>`);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if(!person.name || !person.number)
    return response.status(400).json({
      error: 'Name or number missing'
    })

  if(persons.find(per => per.name === person.name))
    return response.status(409).json({
      error: 'Name must be unique'
    })

  person.id = Math.round(Math.random() * 10000);
  persons = [...persons, person];
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === +request.params.id);
  if (person)
    response.json(person);
  else
    response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const aux = persons.filter(person => person.id !== +request.params.id);
  persons = [...aux];
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
