import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ])
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{' '}
        <input
          type='text'
          placeholder='John Doe'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            required
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter((p) =>
            p.name.toLowerCase().includes(filterValue.toLocaleLowerCase()),
          )
          .map((p) => (
            <div key={p.id}>
              {p.name} {p.number}
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
