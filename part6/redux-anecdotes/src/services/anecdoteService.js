import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => error.response.data)
}

const create = (anecdote) => {
  return axios.post(baseUrl, {
    content: anecdote,
    votes: 0
  })
    .then(response => response.data)
    .catch(error => error.response.data)
}

export default { getAll, create }
