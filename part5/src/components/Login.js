import React, { useState } from 'react'
import { login } from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    setUsername(username)
    setPassword(password)

    login(username, password).then((user) => {
      console.log('login success')
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({
        message: `${user.username} successfully logged in`,
        type: 'success'
      })
    }).catch((error) => {
      console.log(error.response.data.error)
      setNotification({
        message: error.response.data.error,
        type: 'error'
      })
    })
  }

  return (
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type='text' name='username' placeholder='Username' value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password' name='password' placeholder='Password' value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}

export default Login
