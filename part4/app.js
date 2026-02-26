const blogRouter = require('./controllers/blogController')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
const app = express()

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
