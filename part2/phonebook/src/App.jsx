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
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleRemovePerson = (id) => {
    const selectedPerson = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${selectedPerson.name} ?`)) {
      personService
        .remove(id)
        .then(() =>
          setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id)),
        )
    } else {
      return
    }
  }

  const personExists = (name) =>
    persons.find(
      (p) => p.name.toLowerCase().trim() === name.toLowerCase().trim(),
    )

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm('')

    const newPerson = { ...formData }

    if (personExists(newPerson.name)) {
      const p = personExists(newPerson.name)
      console.log(p)
      if (
        window.confirm(
          `${p.name} is already added to phonebook, replace the old number with the new one?`,
        )
      ) {
        personService
          .updateNumber(p, formData.number)
          .then((returnedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((p) =>
                p.id === returnedPerson.id ? returnedPerson : p,
              ),
            )
          })
      }
      return
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) =>
          setPersons((prevPersons) => [...prevPersons, returnedPerson]),
        )
    }

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
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  )
}

export default App
