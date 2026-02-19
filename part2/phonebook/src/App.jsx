import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    id: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: persons.length + 1,
    })
  }

  const nameExists = (name) =>
    persons.some((p) => p.name.toLowerCase() === name.toLowerCase())

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm('')
    if (nameExists(formData.name)) {
      alert(`${formData.name} is already added to phonebook`)
      return
    }

    setPersons([
      ...persons,
      {
        name: formData.name,
        number: formData.number,
        id: persons.length + 1,
      },
    ])

    setFormData({
      name: '',
      number: '',
      id: '',
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
