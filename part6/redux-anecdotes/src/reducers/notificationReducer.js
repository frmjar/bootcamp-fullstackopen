const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case '@notification/new':
      return action.notification
    case '@notification/clear':
      return null
    default:
      return state
  }
}

const newNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: '@notification/new',
      notification
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

const clearNotification = () => {
  return {
    type: '@notification/clear'
  }
}

export default notificationReducer
export { newNotification, clearNotification }
