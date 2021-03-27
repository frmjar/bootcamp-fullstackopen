import React from 'react';
import {saveContact} from '../services/BBDD';

export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!alreadyExist()) {
      setPersons([
        ...persons,
        {name: newName, number: newNumber, id: persons.length + 1}]);
      setNewName('');
      setNewNumber('');
      save();
    }
  };

  const alreadyExist = () => {
    const exist = persons.some((person) => person.name === newName);
    if (exist) alert(`${newName} is already added to phonebook`);
    return exist;
  };

  const save = () => {
    saveContact(newName, newNumber)
        .then(() => console.log('Nuevo registro en la agenda'))
        .catch(() => alert(
            'Ha ocurrido un error al guardar el nuevo contacto'));
  };

  const changeNameHandler = (evt) => {
    setNewName(evt.target.value);
  };

  const changeNumberHandler = (evt) => {
    setNewNumber(evt.target.value);
  };

  return (
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
  );
};