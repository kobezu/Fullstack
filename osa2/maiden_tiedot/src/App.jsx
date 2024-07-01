import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import weatherService from './services/weatherService'


const Weather = ({ weather }) => {
  if (weather !== null) {
    return (
      <div>
        <h2>Weather in {weather.name}</h2>
        <div>
          temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
} 

const Country = ({ country, weather }) => {
  if (country !== null) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div><br/>
        <b>languages: </b>
        <ul>
          {Object.values(country.languages)
            .map((value, index) => {
              return <li key={index}>{value}</li>
            })
          }
        </ul>
        <img src={country.flags.png}/>
        <Weather weather={weather}/>
      </div>
    )
  }
}

const CountryList = ({ countries, activeCountry, showCountry }) => {
  const n = countries.length
  if (n > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (n > 1 && !activeCountry) {
    return (
      <div>{countries.map(country =>
        <div key={country}>
          {country} 
          <button type="show" onClick={() => showCountry(country)}>
            show
          </button>
        </div>
      )}
      </div>
    )
  }
}

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [filter, setFilter] = useState('')  

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => 
        setCountryList(allCountries
          .filter(c => 
            c.toLowerCase().includes(filter.toLowerCase())
          )
        )
      )
  }, [filter])

  const showCountry = (name) => {
    countryService
      .getCountry(name)
      .then(c => {
        setCountry(c)

        weatherService
          .getWeather(c.capital)
          .then(w => setWeather(w))
      })
  }

  useEffect(() => {
    if (countryList.length == 1) {
      showCountry(countryList[0])
    }
    else {
      setCountry(null)
      setWeather(null)
    }
  }, [countryList])

  const handleChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <div>
        find countries <input
          value={filter}
          onChange={handleChange}/>
      </div>
      <CountryList 
        countries={countryList} 
        activeCountry={country}
        showCountry={showCountry}/>
      <Country country={country} weather={weather}/>
    </div>
  )
}

export default App
