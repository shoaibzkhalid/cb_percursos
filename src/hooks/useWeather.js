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

    let url =
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      latitude +
      '&lon=' +
      longitude +
      `&units=metric&appid=${OPEN_WEATHER_KEY}`

    const temp = await fetch(url)
    const res = await temp.json()
    // console.log('res', res)
    dispatch(setWeather(res))
  }

  const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/w/${icon}.png`
  }

  return { getIconUrl }
}
