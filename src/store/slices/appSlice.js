import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const app = createSlice({
  name: 'app',
  // initial state
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload
    },
  },
})

// actions that can be made
export const { setAccessToken } = app.actions
export default app.reducer
