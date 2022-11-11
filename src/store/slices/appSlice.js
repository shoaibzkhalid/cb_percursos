import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const app = createSlice({
  name: 'app',
  // initial state
  initialState: {
    lang: 'pr',
    weather: {
      weather: null,
      main: {
        temp: null,
      },
    },
    filters: [],
    activeTrailType: 'bike',
  },
  reducers: {
    setLang(state, action) {
      state.lang = action.payload
    },
    setWeather(state, action) {
      state.weather = action.payload
    },

    setActiveTrailType(state, action) {
      state.activeTrailType = action.payload
    },
  },
})

// actions that can be made
export const { setLang, setWeather, setActiveTrailType } = app.actions
export default app.reducer
