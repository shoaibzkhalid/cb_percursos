import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { OPEN_WEATHER_KEY } from 'config/keys'
import { setWeather } from 'store/slices/appSlice'
import { useLocation } from './useLocation'

export const useWeather = () => {
  useLocation()
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  React.useEffect(() => {
    getWeather()
  }, [userLocation])

  const getWeather = async () => {
    if (!userLocation) return
    const { latitude, longitude } = userLocation

    // 39.819838, -7.495759

    let url =
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      39.819838 +
      '&lon=' +
      -7.495759 +
      `&units=metric&appid=${OPEN_WEATHER_KEY}`

    const temp = await fetch(url)
    const res = await temp.json()
    // console.log('res', res, temp)
    dispatch(setWeather(res))
  }

  const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/w/${icon}.png`
  }

  return { getIconUrl }
}
