import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

import app from 'store/slices/appSlice'

// Redux store setup
// root reducer
const rootReducer = combineReducers({
  app,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['app'],
  },
  rootReducer
)

// store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: {
        warnAfter: 500,
      },
      serializableCheck: false,
    }).concat(),
})

export const persistor = persistStore(store)
// export const persistor = store
// persistor.purge()
