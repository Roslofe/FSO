import { createSlice } from '@reduxjs/toolkit'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      const updatedUser = action.payload
      const id = updatedUser.id
      return state.map((user) => (user.id === id ? updatedUser : user))
    },
  },
})

export const { setUsers, updateUser } = allUsersSlice.actions

export default allUsersSlice.reducer
