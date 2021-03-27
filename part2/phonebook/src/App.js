import React, {useEffect, useState} from 'react';
import {PersonForm} from './components/PersonForm.js';
import {Persons} from './components/Persons.js';
import {Filter} from './components/Filter.js';
import {getAllContacts} from './services/BBDD';
import './App.css';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
        getAllContacts()
            .then(data => setPersons(data))
            .catch(e => console.error('Error en el GET:', e));
      }
      , []);

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