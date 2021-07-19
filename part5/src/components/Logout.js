const Logout = ({ name, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return (
    <div>
      <span>{name} logged in </span>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout
