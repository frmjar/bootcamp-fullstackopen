const Logout = ({ name }) => {
  console.log(name)
  const logout = () => {
    window.localStorage.removeItem('user')
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
