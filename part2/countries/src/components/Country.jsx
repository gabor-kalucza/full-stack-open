const Country = ({ country }) => {
  return (
    <article key={country.name.official}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital?.join(', ')}</p>
      <p>area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>
      <img
        className='img'
        src={country.flags.svg}
        alt={country.flags.official}
      />
    </article>
  )
}

export default Country
