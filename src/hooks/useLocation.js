import React from 'react'
import GetLocation from 'react-native-get-location'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLocation } from 'store/slices/appSlice'

export const useLocation = () => {
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  const getLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        // Setting this to true makes location null on Android Emulator
        enableHighAccuracy: true,
        timeout: 15000,
      })

      // console.log('getLocation', location)

      dispatch(setUserLocation(location))
    } catch (e) {
      console.log('error getting location', e)
    }
  }

  // React.useEffect(() => {
  //   getLocation()
  // }, [])

  return { userLocation, getLocation }
}
