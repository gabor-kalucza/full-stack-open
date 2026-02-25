const express = require('express')
const postLogger = require('./middlewares/postLogger')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static('dist'), express.json(), morgan('tiny'), cors())

let persons = Person.find({}).then((result) => {
  persons = result
})

app.get('/info', (_, res) => {
  const requestSentAt = new Date()

  res.send(
    `Phonebook has info for ${persons.length} people<br>${requestSentAt.toString()}`,
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', postLogger, (req, res) => {
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
    name,
    number,
  }

  Person.create(person).then((savedPerson) => {
    res.status(201).json(savedPerson)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

app.use(errorHandler)
