import React, {useState} from 'react';
import {PersonForm} from './components/PersonForm.js';
import {Persons} from './components/Persons.js';
import {Filter} from './components/Filter.js';
import './App.css';

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'},
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  return (
      <div className={'container'}>
        <h2>Phonebook</h2>
        <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
        <h2>Add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} newName={newName}
                    setNewName={setNewName}
                    newNumber={newNumber} setNewNumber={setNewNumber}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filter={newFilter}/>
      </div>
  );
};

export default App;