const Countries = ({ countries, setResults }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li className='flex' key={c.name.official}>
          <p>{c.name.common}</p>
          <button onClick={() => setResults([c])}>Show</button>
        </li>
      ))}
    </ul>
  )
}
export default Countries
