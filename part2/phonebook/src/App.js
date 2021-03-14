import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number:'91412412'},
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!alreadyExist()) {
      setPersons([...persons, {name: newName, number: newNumber}]);
      setNewName('');
      setNewNumber('');
    }
  };

  const alreadyExist = () => {
    const exist = persons.some((person) => person.name === newName);
    if (exist) alert(`${newName} is already added to phonebook`);
    return exist;
  };

  const changeNameHandler = (evt) => {
    setNewName(evt.target.value);
  };

  const changeNumberHandler = (evt) => {
    setNewNumber(evt.target.value);
  };

  return (
      <div className={'container'}>
        <h2>Phonebook</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label>name: </label>
            <input onChange={changeNameHandler} value={newName}/>
          </div>
          <div>
            <label>number: </label>
            <input onChange={changeNumberHandler} value={newNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
  );
};

export default App;