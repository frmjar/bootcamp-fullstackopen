import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (evt) => {
    evt.preventDefault()
    const anecdote = evt.target.anecdote.value
    evt.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(newNotification('Anecdote created'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
