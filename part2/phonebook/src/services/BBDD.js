import axios from 'axios';

const URL = 'http://localhost:3001/persons';

export const getAllContacts = () => {
  return axios.get(URL).then(response => response.data);
};

export const saveContact = (name, number) => {
  return axios.post(URL, {name: name, number: number});
};

export const deleteContact = (id) => {
  return axios.delete(`${URL}/${id}`)
}