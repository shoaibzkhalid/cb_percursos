import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import app from 'store/slices/appSlice'
import filter from 'store/slices/filterSlice'
import trail from 'store/slices/trailSlice'

// Redux store setup
// root reducer
const rootReducer = combineReducers({
  app,
  filter,
  trail,
})

// store configuration
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: {
        warnAfter: 500,
      },
      serializableCheck: false,
    }).concat(),
})
