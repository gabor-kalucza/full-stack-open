import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/all`).then((res) => {
      setCountries(res.data)
    })
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setCountry(value)
    const filtered = countries.filter((c) =>
      c.name.official.toLowerCase().includes(value.toLocaleLowerCase()),
    )
    setResults(filtered)
  }

  return (
    <div>
      <label htmlFor='country'>find countries</label>
      <input
        type='text'
        id='country'
        value={country}
        onChange={handleInputChange}
        placeholder='Switzerland'
      />

      {country && results.length === 1 ? (
        <div>
          {results.map((c) => (
            <Country key={c.name.common} country={c} />
          ))}
        </div>
      ) : (
        <div>
          {results.length > 10 ? (
            <p>too many matches, specify another filter</p>
          ) : (
            <Countries countries={results} setResults={setResults} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
