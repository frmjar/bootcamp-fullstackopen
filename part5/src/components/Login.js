import React from 'react'
import { login } from '../services/login'

const Login = ({ username, password, setUsername, setPassword, setUser }) => {
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
    }).catch((error) => {
      console.log(error)
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
