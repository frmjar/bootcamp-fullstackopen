export const Filter = ({ newFilter, setNewFilter }) => {
  const changeHandler = (evt) => {
    setNewFilter(evt.target.value)
  }

  return (
    <div>
      <span>Filter shown with</span>
      <input onChange={changeHandler} value={newFilter} />
    </div>
  )
}
