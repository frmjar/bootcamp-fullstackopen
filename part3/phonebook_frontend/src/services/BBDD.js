import axios from 'axios';

const URL = 'https://thawing-mesa-23502.herokuapp.com/api/persons';

export const getAllContacts = () => {
  return axios.get(URL).then(response => response.data);
};

export const saveContact = (name, number) => {
  return axios.post(URL, {name: name, number: number});
};

export const deleteContact = (id) => {
  return axios.delete(`${URL}/${id}`);
};

export const updateContact = (person) => {
  return axios.put(`${URL}/${person.id}`, person)
              .then((response) => response.data);
};