const notificationReducer = (state = 'Notificacion inicial', action) => {
  switch (action.type) {
    case '@notification/new':
      return action.notification
    case '@notification/clear':
      return null
    default:
      return state
  }
}

const newNotification = notification => {
  return {
    type: '@notification/new',
    notification
  }
}

const clearNotification = () => {
  return {
    type: '@notification/clear'
  }
}

export default notificationReducer
export { newNotification, clearNotification }
