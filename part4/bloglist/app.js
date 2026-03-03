const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')

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

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
