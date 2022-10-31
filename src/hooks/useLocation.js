import React from 'react'
import GetLocation from 'react-native-get-location'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLocation } from 'store/slices/appSlice'

export const useLocation = () => {
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

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
        dispatch(setUserLocation(location))
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
