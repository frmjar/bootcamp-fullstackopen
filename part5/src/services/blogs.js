import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (tok) => {
  token = `Bearer ${tok}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const save = (blog) => {
  const request = axios.post(baseUrl, blog, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const updateBlog = (blog) => {
  console.log(blog)
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

export default {
  setToken,
  getAll,
  save,
  updateBlog,
  deleteBlog
}
