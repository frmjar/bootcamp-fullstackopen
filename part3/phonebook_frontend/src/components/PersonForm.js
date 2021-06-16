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
      save().then(newContact => setPersons([
        ...persons, newContact])).catch(err => console.log(err));
    } else {
      const wantUpdate = window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`);
      if (wantUpdate) {
        update(person);
      }
    }

    setNewName('');
    setNewNumber('');

  };

  const save = () => {
    return saveContact(newName, newNumber)
        .then((newContact) => {
          setNewNotification(
              {message: `Added ${newContact.name}`, type: 'info'});
          setTimeout(() => {
            setNewNotification({});
          }, 3000);
          return newContact;
        })
        .catch((err) => {
          alert(err);
          return Promise.reject(new Error(err));
        });
  };

  const update = (person) => {
    person.number = newNumber;
    updateContact(person)
        .then(() => {
          setNewNotification({message: `Updated ${newName}`, type: 'info'});
          setTimeout(() => {
            setNewNotification({});
          }, 3000);
        })
        .catch(() => {
          setNewNotification({
            message: `Information of ${newName} has already been removed from server`,
            type: 'error',
          });
          setTimeout(() => {
            setNewNotification({});
          }, 3000);
        });
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