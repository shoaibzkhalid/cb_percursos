import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const app = createSlice({
  name: 'app',
  // initial state
  initialState: {
    lang: 'en',
    userLocation: null,
    weather: {
      weather: null,
      main: {
        temp: null,
      },
    },
  },
  reducers: {
    setLang(state, action) {
      state.lang = action.payload
    },
    setWeather(state, action) {
      state.weather = action.payload
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload
    },
  },
})

// actions that can be made
export const { setLang, setUserLocation, setWeather } = app.actions
export default app.reducer
