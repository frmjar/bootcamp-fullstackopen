import React from 'react';
import {saveContact, updateContact} from '../services/BBDD';

export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setNewNotification,
}) => {

  const submitHandler = (evt) => {
    evt.preventDefault();

    const person = persons.find((person) => person.name === newName);

    if (person === undefined) {
      save();
      setPersons([
        ...persons,
        {name: newName, number: newNumber, id: persons.length + 1}]);
    } else {
      const wantUpdate = window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`);
      if (wantUpdate) {
        update(person);
        let auxPersons = persons;
        auxPersons[person.id - 1].number = person.number;
        setPersons(auxPersons);
      }
    }

    setNewName('');
    setNewNumber('');

  };

  const save = () => {
    saveContact(newName, newNumber)
        .then(() => {
          setNewNotification(`Added ${newName}`);
          setTimeout(() => {
            setNewNotification('');
          }, 3000);
        })
        .catch(() => alert(
            'Ha ocurrido un error al guardar el nuevo contacto'));
  };

  const update = (person) => {
    person.number = newNumber;
    updateContact(person)
        .then(() => {
          setNewNotification(`Updated ${newName}`);
          setTimeout(() => {
            setNewNotification('');
          }, 3000);
        })
        .catch((e) => console.error(
            'Ha ocurrido un error al actualizar el contacto', e));
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