import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const usr = window.localStorage.getItem('user')
    if (usr) {
      setUser(JSON.parse(usr))
    }
  }, [])

  return (
    user === null
      ? <Login
          username={username} password={password}
          setUsername={setUsername} setPassword={setPassword} setUser={setUser}
        />
      : <div><Logout name={user.name} setUser={setUser} /> <BlogForm token={user.token} blogs={blogs} setBlogs={setBlogs} /> <Blogs blogs={blogs} /> </div>

  )
}

export default App
