import { useNotifValue } from "../NotifContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notifText = useNotifValue()
  
  if (notifText === '') return null

  return (
    <div style={style}>
      {notifText}
    </div>
  )
}

export default Notification
