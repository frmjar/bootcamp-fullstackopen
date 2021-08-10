import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => error.response.data)
}

export default { getAll }
