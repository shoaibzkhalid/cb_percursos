export const getWeather = async (location) => {
  const { latitude, longitude } = location

  let url =
    'https://api.openweathermap.org/data/2.5/forecast?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&units=metric&appid=YOUR API KEY HERE'

  const response = await fetch(url)
  console.log(response)
}
