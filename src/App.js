import React from 'react'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from 'store'
import Routes from 'navigation/routes'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
