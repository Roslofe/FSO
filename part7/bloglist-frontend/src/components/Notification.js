import { useSelector } from 'react-redux'

const Notification = () => {
  const { msg, isError } = useSelector((state) => state.notif)
  if (msg === null) {
    return null
  } else if (isError) {
    console.log('error')
    return <div className="errorMsg">{msg}</div>
  } else {
    return <div className="notifMsg">{msg}</div>
  }
}

export default Notification
