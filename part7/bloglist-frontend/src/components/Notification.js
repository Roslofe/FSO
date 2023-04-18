import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const { msg, isError } = useSelector((state) => state.notif)
  if (msg === null) {
    return null
  } else if (isError) {
    return <Alert variant="danger">{msg}</Alert>
  } else {
    return <Alert variant="success">{msg}</Alert>
  }
}

export default Notification
