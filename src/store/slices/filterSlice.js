import { createSlice } from '@reduxjs/toolkit'
import { FILTER_INITIAL_STATE } from 'config/constants'

// slice for general global app variables
const filter = createSlice({
  name: 'filter',
  // initial state
  initialState: {
    trailFilters: FILTER_INITIAL_STATE,
    filterLoading: true,
    applied: false,

    distance: [],
    difficulty: [],
    duration: [],
    type: [],
  },
  reducers: {
    setFilter(state, action) {
      state.trailFilters = action.payload
    },
    setFilterLoading(state, action) {
      state.filterLoading = action.payload
    },

    setDistance(state, action) {
      state.distance = action.payload
    },
    setDuration(state, action) {
      state.duration = action.payload
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload
    },
    setType(state, action) {
      state.type = action.payload
    },
    setApplied(state, action) {
      state.applied = action.payload
    },
  },
})

// actions that can be made
export const {
  setFilter,
  setFilterLoading,
  setDistance,
  setType,
  setDifficulty,
  setDuration,
  setApplied,
} = filter.actions

export default filter.reducer
