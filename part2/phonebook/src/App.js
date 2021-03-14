import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'},
  ]);
  const [newName, setNewName] = useState('');

  const submitHandler = (evt) => {
    evt.preventDefault();
    if(!alreadyExist()) {
      setPersons([...persons, {name: newName}]);
      setNewName('')
    }
  };

  const alreadyExist = () => {
    const exist = persons.some((person) => person.name === newName);
    if(exist) alert(`${newName} is already added to phonebook`)
    return exist;
  }

  const changeHandler = (evt) => {
    setNewName(evt.target.value);
  };

  return (
      <div className={'container'}>
        <h2>Phonebook</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label>name: </label><input onChange={changeHandler} value={newName}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
  );
};

export default App;