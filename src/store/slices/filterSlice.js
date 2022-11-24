import { createSlice } from '@reduxjs/toolkit'
import { FILTER_INITIAL_STATE } from 'config/constants'

// slice for general global app variables
const filter = createSlice({
  name: 'filter',
  // initial state
  initialState: {
    trailFilters: FILTER_INITIAL_STATE,
    filterLoading: true,
  },
  reducers: {
    setFilter(state, action) {
      state.trailFilters = action.payload
    },
    setFilterLoading(state, action) {
      state.filterLoading = action.payload
    },
  },
})

// actions that can be made
export const { setFilter, setFilterLoading } = filter.actions
export default filter.reducer
