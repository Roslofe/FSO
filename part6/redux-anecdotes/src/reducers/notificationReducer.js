import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'important message',
  reducers: {
    displayMessage(state, action) {
      return action.payload
    }
  }
})

export const { displayMessage } = notificationSlice.actions
export default notificationSlice.reducer