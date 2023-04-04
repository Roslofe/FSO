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

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(displayMessage(text))
    setTimeout(() => {
      dispatch(resetMessage())
    }, time * 1000)
  }
}

export default notificationSlice.reducer