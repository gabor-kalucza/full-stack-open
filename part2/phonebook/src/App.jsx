import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    id: '',
  })

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get('http://localhost:3001/persons')
        setPersons(response.data)
      } catch (error) {
        console.error('Error fetching persons:', error)
      }
    }

    fetchPersons()
  }, [])

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
