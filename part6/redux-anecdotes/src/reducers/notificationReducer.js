const notificationReducer = (state = 'Notificacion inicial', action) => {
  switch (action.type) {
    case '@notification/new':
      return action.notification
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

export default notificationReducer
export { newNotification }
