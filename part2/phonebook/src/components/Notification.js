import '../styles/notification.css'

export const Notification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
      <div className="error">
        {message}
      </div>
  )
}