import { useEffect, useState } from 'react'
import axios from 'axios'

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
            <article key={c.name.official}>
              <h1>{c.name.common}</h1>
              <p>capital {c.capital?.join(', ')}</p>
              <p>area {c.area}</p>
              <h2>Languages</h2>
              <ul>
                {c.languages &&
                  Object.values(c.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
              </ul>
              <img className='img' src={c.flags.svg} alt={c.flags.official} />
            </article>
          ))}
        </div>
      ) : (
        <div>
          {results.length > 10 ? (
            <p>too many matches, specify another filter</p>
          ) : (
            <ul>
              {results.map((c) => (
                <li key={c.name.official}>{c.name.common}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default App
