import { createSlice } from '@reduxjs/toolkit'

const trail = createSlice({
  name: 'trail',
  // initial state
  initialState: {
    trails: [],
    filteredTrails: [],
    activeTrail: null,
  },
  reducers: {
    setActiveTrail(state, action) {
      state.activeTrail = action.payload
    },

    setTrails(state, action) {
      state.trails = action.payload
    },
    setFilteredTrails(state, action) {
      state.filteredTrails = action.payload
    },
  },
})

// actions that can be made
export const { setTrails, setActiveTrail, setFilteredTrails } = trail.actions
export default trail.reducer
