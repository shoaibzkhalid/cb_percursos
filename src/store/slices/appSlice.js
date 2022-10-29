import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const app = createSlice({
  name: 'app',
  // initial state
  initialState: {
    accessToken: null,
    userLocation: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload
    },
  },
})

// actions that can be made
export const { setAccessToken, setUserLocation } = app.actions
export default app.reducer
