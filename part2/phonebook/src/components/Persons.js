import React from 'react';
import {deleteContact} from '../services/BBDD';

export const Persons = ({persons, filter, setPersons}) => {

  const clickHandler = ({name, id}) => {

    const result = window.confirm(`Delete ${name}?`);
    if (result) {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);

      deleteContact(id)
          .then(() => console.log('Contacto borrado correctamente'))
          .catch(() => console.error('Error al borrar el contacto'));
    }

  };

  return (
      persons.filter(
          person => filter === '' ? true :
              person.name.toLowerCase().includes(filter.toLowerCase()))
             .map(person =>
                 <div key={person.id}>{
                   person.name} {person.number}
                   <button onClick={() => clickHandler(person)}>Delete
                   </button>
                 </div>,
             )
  );
};