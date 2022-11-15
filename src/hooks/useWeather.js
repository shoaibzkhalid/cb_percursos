import React from 'react'
import { useDispatch } from 'react-redux'
import GetLocation from 'react-native-get-location'

import { OPEN_WEATHER_KEY } from 'config/keys'
import {
  setUserLocation,
  setWeather,
  setWeatherForecast,
  setWeatherLoading,
} from 'store/slices/appSlice'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const useWeather = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setWeatherLoading(true))
    getWeather()
    getWeatherForecast()
  }, [])

  const getWeather = async () => {
    // 39.819838, -7.495759
    let url = `${BASE_URL}/weather?lat=${39.819838}&lon=${-7.495759}&units=metric&appid=${OPEN_WEATHER_KEY}`

    const temp = await fetch(url)
    const res = await temp.json()
    dispatch(setWeather(res))

    const location = await GetLocation.getCurrentPosition({
      // Setting this to true makes location null on Android Emulator
      enableHighAccuracy: true,
      timeout: 15000,
    })

    dispatch(setUserLocation(location))
  }

  const getWeatherForecast = async () => {
    let url = `${BASE_URL}/forecast?lat=${39.819838}&lon=${-7.495759}&units=metric&appid=${OPEN_WEATHER_KEY}`
    const temp = await fetch(url)
    const res = await temp.json()

    const forecast = [res.list[4], res.list[12], res.list[20], res.list[28]]

    dispatch(setWeatherForecast(forecast))
    dispatch(setWeatherLoading(false))
  }

  // const getIconUrl = (icon) => `https://openweathermap.org/img/w/${icon}.png`

  return {}
}
