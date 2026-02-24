const express = require('express')
const persons = require('./persons')

const PORT = 8080
const app = express()

app.use(express.json())

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const requestSentAt = new Date()

  res.send(
    `Phonebook has info for ${persons.length} people<br>${requestSentAt.toString()}`,
  )
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
