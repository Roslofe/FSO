import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    notif: notifReducer,
  },
})

export default store
