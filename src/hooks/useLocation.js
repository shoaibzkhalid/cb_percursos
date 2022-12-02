import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLocation } from 'store/slices/appSlice'

import Geolocation from '@react-native-community/geolocation'

export const useLocation = () => {
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  const getLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        (info) => {
          const location = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            altitude: info.coords.altitude,
          }

          console.log(info.coords)

          dispatch(setUserLocation(location))
        },
        () => {},
        {
          enableHighAccuracy: false,
        }
      )
    } catch (e) {
      console.log('error getting location', e)
    }
  }

  React.useEffect(() => {
    getLocation()

    // Geolocation.watchPosition(
    //   (info) => {
    //     const location = {
    //       latitude: info.coords.latitude,
    //       longitude: info.coords.longitude,
    //       altitude: info.coords.altitude,
    //     }

    //     console.log('test', location)

    //     dispatch(setUserLocation(location))
    //   },
    //   null,
    //   {
    //     timeout: 1000,
    //     maximumAge: 0,
    //   }
    // )
  }, [])

  return { userLocation, getLocation }
}
