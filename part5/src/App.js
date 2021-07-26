/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Alerts from './components/Alerts'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({})

  const toggleRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((blogA, blogB) => blogA.likes < blogB.likes)
      setBlogs(blogs)
    })
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
    <>
      <Alerts alert={alert} />

      {user === null
        ? <Login
            setUser={setUser} setNotification={setNotifications}
          />
        : <>
          <Logout name={user.name} setUser={setUser} />
          <Togglable titleButton='Create new blog' ref={toggleRef}>
            <BlogForm
              token={user.token} blogs={blogs} setBlogs={setBlogs}
              setNotification={setNotifications} toggleRef={toggleRef}
            />
          </Togglable>
          <Blogs blogs={blogs} />
        </>}
    </>

  )
}

export default App
