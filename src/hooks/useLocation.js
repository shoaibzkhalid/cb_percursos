import { useDispatch, useSelector } from 'react-redux'
import { setUserLocation } from 'store/slices/appSlice'

import Geolocation from '@react-native-community/geolocation'
import React from 'react'

export const useLocation = () => {
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  const getLocation = async () => {
    try {
      Geolocation.getCurrentPosition((info) => {
        const location = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          altitude: info.coords.altitude,
        }
        // console.log('got location', info)
        dispatch(setUserLocation(location))
      })
    } catch (e) {
      console.log('error getting location', e)
    }
  }

  React.useEffect(() => {
    Geolocation.watchPosition((info) => {
      const location = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        altitude: info.coords.altitude,
      }
      // console.log('watchPosition', info)
      dispatch(setUserLocation(location))
    })
  }, [])

  return { userLocation, getLocation }
}
