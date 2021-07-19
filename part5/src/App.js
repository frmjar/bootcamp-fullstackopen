/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Alerts from './components/Alerts'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({})

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

  const setNotifications = notifications => {
    setAlert(notifications)
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  return (

    user === null
      ? <div>
        <Alerts alert={alert} />
        <Login
          username={username} password={password}
          setUsername={setUsername} setPassword={setPassword} setUser={setUser}
          setNotification={setNotifications}
        />
      </div>
      : <div>
        <Alerts alert={alert} />
        <Logout name={user.name} setUser={setUser} />
        <BlogForm
          token={user.token} blogs={blogs} setBlogs={setBlogs}
          setNotification={setNotifications}
        />
        <Blogs blogs={blogs} />
      </div>

  )
}

export default App
