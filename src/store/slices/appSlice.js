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
    weatherForecast: null,
    filters: [],
    activeTrailType: 'bike',
    activeTrail: null,
    weatherLoading: null,
  },
  reducers: {
    setLang(state, action) {
      state.lang = action.payload
    },
    setWeather(state, action) {
      state.weather = action.payload
    },

    setWeatherForecast(state, action) {
      state.weatherForecast = action.payload
    },

    setActiveTrailType(state, action) {
      state.activeTrailType = action.payload
    },

    setActiveTrail(state, action) {
      state.activeTrail = action.payload
    },

    setWeatherLoading(state, action) {
      state.weatherLoading = action.payload
    },
  },
})

// actions that can be made
export const {
  setLang,
  setWeatherLoading,
  setWeather,
  setWeatherForecast,
  setActiveTrailType,
  setActiveTrail,
} = app.actions
export default app.reducer
