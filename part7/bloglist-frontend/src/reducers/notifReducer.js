import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: { msg: null, isError: false },
  reducers: {
    setNotif(state, action) {
      const content = action.payload
      return { msg: content.msg, isError: content.isError }
    },
    resetNotif(state, action) {
      console.log(action)
      return { ...state, msg: null }
    },
  },
})

export const { setNotif, resetNotif } = notifSlice.actions

export const updateNotif = (msg, isError) => {
  return (dispatch) => {
    dispatch(setNotif(msg, isError))
    setTimeout(() => {
      dispatch(resetNotif())
    }, 5000)
  }
}

export default notifSlice.reducer
