import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const app = createSlice({
  name: 'app',
  // initial state
  initialState: {
    lang: 'pt',
    weather: {
      weather: null,
      main: {
        temp: null,
      },
    },
    filters: [],

    activeTrailType: 'bike',
    routePlaying: false,
    activeTrail: null,

    weatherForecast: null,
    weatherLoading: null,
    userLocation: null,
    isLoading: false,
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

    setUserLocation(state, action) {
      state.userLocation = action.payload
    },

    setRoutePlaying(state, action) {
      state.routePlaying = action.payload
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
  setUserLocation,
  setRoutePlaying,
} = app.actions
export default app.reducer
