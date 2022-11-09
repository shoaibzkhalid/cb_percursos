import { createSlice } from '@reduxjs/toolkit'

// slice for general global app variables
const filter = createSlice({
  name: 'filter',
  // initial state
  initialState: {
    trailFilters: {
      duration: [],
      distance: [],
      difficulty: [],
    },
    filtersApplied: false,
  },
  reducers: {
    setFilter(state, action) {
      state.trailFilters = action.payload
    },

    setFiltersApplied(state, action) {
      state.filtersApplied = action.payload
    },
  },
})

// actions that can be made
export const { setFilter, setFiltersApplied } = filter.actions
export default filter.reducer
