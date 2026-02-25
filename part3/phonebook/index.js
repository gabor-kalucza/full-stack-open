const express = require('express')
const postLogger = require('./middlewares/postLogger')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static('dist'), express.json(), morgan('tiny'), cors())

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (req, res) => {
  const requestSentAt = new Date()

  res.send(
    `Phonebook has info for ${persons.length} people<br>${requestSentAt.toString()}`,
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    return res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', postLogger, (req, res) => {
  const id = Math.random().toString(36).substring(2, 6)
  const { number, name } = req.body || {}
  const names = persons.map((p) => p.name.toLowerCase())
  const isNameExists = names.some((n) => n === name?.toLowerCase())

  if (!number || !name) {
    return res.status(400).json({
      error: 'name or number field is missing',
    })
  }

  if (isNameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id,
    name,
    number,
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter((person) => person.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
