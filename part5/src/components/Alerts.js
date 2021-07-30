import PropTypes from 'prop-types'
import '../styles/alerts.css'

const Alerts = ({ alert }) => {
  const { message, type } = alert
  const clases = `alert alert-${type}`

  if (!message) {
    return null
  }

  return (
    <div className={clases}>
      <span>{message}</span>
    </div>
  )
}

Alerts.propTypes = {
  alert: PropTypes.exact({
    message: PropTypes.string,
    type: PropTypes.string
  })
}

export default Alerts
