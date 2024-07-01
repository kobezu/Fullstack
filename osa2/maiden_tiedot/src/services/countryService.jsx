import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return (
    axios
      .get(baseUrl + '/all')
      .then(response => {
        return response.data.map(c => c.name.common)
      })
  )
}

const getCountry = (name) => {
  return (
    axios
      .get(`${baseUrl}/name/${name}`)
      .then(response => {
        return response.data
      })
  )
}

export default {getAll, getCountry}