import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (city) => {
  return (
    axios
      .get(`${baseUrl}${city}&appid=${api_key}`)
      .then(result => {
        return result.data
      })
  )
}

export default {getWeather}