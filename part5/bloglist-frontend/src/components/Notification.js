const Notification = ({ msg, isError }) => {
  if (msg === null) {
    return null
  } else if (isError) {
    console.log('error')
    return (
      <div className="errorMsg">
        {msg}
      </div>
    )
  } else {
    return (
      <div className="notifMsg">
        {msg}
      </div>
    )
  }
}

export default Notification