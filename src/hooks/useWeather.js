import React from 'react'
import { useDispatch } from 'react-redux'

import { OPEN_WEATHER_KEY } from 'config/keys'
import { setWeather } from 'store/slices/appSlice'

export const useWeather = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    getWeather()
  }, [])

  const getWeather = async () => {
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
