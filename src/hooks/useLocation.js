import React from 'react'
import GetLocation from 'react-native-get-location'

const deltaCoordinates = {
  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,
  latitudeDelta: 0.003,
  longitudeDelta: 0.002,
}

export const useLocation = () => {
  const [userLocation, setUserLocation] = React.useState('')

  // user location effect
  React.useEffect(() => {
    const get = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          // Setting this to true makes location null on Android Emulator
          enableHighAccuracy: true,
          timeout: 15000,
        })

        if (!location) return
        setUserLocation(location)
      } catch (error) {
        console.log('error getting location', error)

        if (error.code == 'UNAUTHORIZED') {
          return showErrorToast('Location permission not granted')
        }
      }
    }

    get()
  }, [])

  return {
    userLocation,
  }
}
