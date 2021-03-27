import React from 'react';

export const Persons = ({persons, filter}) => {
  return (
      persons.filter(
          person => filter === '' ? true :
              person.name.toLowerCase().includes(filter.toLowerCase()))
             .map(person =>
              <div key={person.id}>{
                person.name} {person.number}
              </div>,
          )
  );
};