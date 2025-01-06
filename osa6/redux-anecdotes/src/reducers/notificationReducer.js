import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    visible: false
  },
  reducers: {
    showNotification(state, action) {
      return {
        content: action.payload,
        visible: true
      }
    },
    hideNotification() {
      return {
        content: '',
        visible: false
      }
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
  return dispatch => {
    dispatch(showNotification(content))

    setTimeout(() => {
      dispatch(hideNotification())
    }, 1000 * duration)
  }
}

export default notificationSlice.reducer
