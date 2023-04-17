import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const setInitialUser = () => {
  const userJSON = window.localStorage.getItem('bloglistUser')
  if (userJSON !== null) {
    const user = JSON.parse(userJSON)
    blogService.setToken(user.token)
    return user
  } else {
    return null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: setInitialUser,
  reducers: {
    logIn(state, action) {
      return action.payload
    },
    logOut(state, action) {
      console.log(`logged out ${action.payload.name}`)
      return null
    },
  },
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer
