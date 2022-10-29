import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from 'store'
import Routes from 'navigation/routes'

LogBox.ignoreLogs([
  'Remote debugger',
  // 'to be unitless',
  'Require cycle',
  // 'ViewPropTypes',
  // 'Found screens with',
  // 'new NativeEventEmitter',
  // 'When server rendering',
  // 'VirtualizedList: Encountered an error while measuring',
])

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
