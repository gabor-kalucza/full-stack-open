import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    number: '',
  })

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data))
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    const newPerson = {
      name: formData.name,
      number: formData.number,
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => setPersons([...persons, returnedPerson]))

    setFormData({
      name: '',
      number: '',
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
