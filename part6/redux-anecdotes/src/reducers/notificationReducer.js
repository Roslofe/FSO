import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayMessage(state, action) {
      return action.payload
    },
    resetMessage(state, action) {
      return ''
    }
  }
})

export const { displayMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer