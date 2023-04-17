import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
