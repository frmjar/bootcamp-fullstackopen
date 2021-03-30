import '../styles/notification.css';

export const Notification = ({message}) => {
  const clase = `notification ${message.type}`;

  if (message.message === undefined) {
    return null;
  }

  return (
      <div className={clase}>
        {message.message}
      </div>
  );
};