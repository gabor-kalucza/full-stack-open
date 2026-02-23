import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    number: '',
  })

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data))
  }, [])

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => setNotificationMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notificationMessage])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trimStart(),
    })
  }

  const handleRemovePerson = (id) => {
    const selectedPerson = persons.find((p) => p.id === id)
    const confirmRemovePerson = window.confirm(
      `Delete ${selectedPerson.name} ?`,
    )

    if (!confirmRemovePerson) {
      return
    }

    personService
      .remove(id)
      .then(() =>
        setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id)),
      )
  }

  const personExists = (name) =>
    persons.find(
      (p) => p.name.toLowerCase().trim() === name.toLowerCase().trim(),
    )

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm('')

    const newPerson = {
      name: formData.name.trim(),
      number: formData.number.trim(),
    }

    const existingPerson = personExists(newPerson.name)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with the new one?`,
      )

      if (!confirmUpdate) {
        return
      }

      personService
        .updateNumber(existingPerson, formData.number)
        .then((returnedPerson) => {
          setPersons((prevPersons) =>
            prevPersons.map((p) =>
              p.id === returnedPerson.id ? returnedPerson : p,
            ),
          )
          setNotificationMessage(
            `Successfully updated ${existingPerson.name} phone number`,
          )
          setIsError(false)
        })
        .catch(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((p) => p.id !== existingPerson.id),
          )
          setNotificationMessage(
            `Information of ${existingPerson.name} has already been removed from server`,
          )
          setIsError(true)
        })
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) =>
          setPersons((prevPersons) => [...prevPersons, returnedPerson]),
        )

      setNotificationMessage(
        `Successfully added ${newPerson.name} to phonebook`,
      )

      setIsError(false)
    }

    setFormData({
      name: '',
      number: '',
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
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
