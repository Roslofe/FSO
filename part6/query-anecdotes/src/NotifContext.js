import { useEffect, createContext, useReducer, useContext } from 'react';

const notifReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotifContex = createContext()

export const NotifContextProvider = (props) => {
  const [notifText, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContex.Provider value={[notifText, notifDispatch]}>
      {props.children}
    </NotifContex.Provider>
  )
}

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContex)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContex)[1]
  const currValue = useNotifValue()
  if(currValue) {
    setTimeout(() => {
      notifAndDispatch({type: 'RESET'})
    }, 5000)
  }
  return notifAndDispatch
}

export default NotifContex