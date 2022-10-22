const Notification = ({ message, notificationStyle }) => {
  const color = notificationStyle === "success" ? "green" : "red";
  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return <div style={errorStyle}>{message}</div>;
};

export default Notification;
