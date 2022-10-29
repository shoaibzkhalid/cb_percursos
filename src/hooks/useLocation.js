import React from 'react'
import GetLocation from 'react-native-get-location'

const deltaCoordinates = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const useLocation = () => {
  const [destination, setDestination] = React.useState('')

  // user location effect
  React.useEffect(() => {
    ;(async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          // Setting this to true makes location null on Android Emulator
          enableHighAccuracy: false,
          timeout: 15000,
        })

        // console.log('check', userCountry)
        if (!location) return
        setDestination(location)
      } catch (error) {
        if (error.code == 'UNAUTHORIZED') {
          return showErrorToast('Location permission not granted')
        }

        console.log('error getting location')
      }
    })()
  }, [])

  return { destination }
}
