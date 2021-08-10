import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case '@anecdote/vote':
      return state.map((anecdote) => {
        if (anecdote.id === action.anecdote.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
    case '@anecdote/create':
      return [
        ...state,
        action.anecdote
      ]
    case '@anecdote/init':
      return action.anecdotes
    default:
      return state
  }
}

const voteAnecdote = id => {
  return {
    type: '@anecdote/vote',
    anecdote: { id }
  }
}

const createAnecdote = (anecdote) => {
  return {
    type: '@anecdote/create',
    anecdote
  }
}

const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: '@anecdote/init',
      anecdotes
    })
  }
}

export default anecdoteReducer
export {
  voteAnecdote,
  createAnecdote,
  initAnecdotes
}
