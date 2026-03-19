const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const testingRouter = require('./controllers/testing')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
const app = express()

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl, { family: 4 })
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message)
  }
}

connectToMongoDB()

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
