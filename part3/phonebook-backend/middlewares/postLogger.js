const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'access.log'),
  {
    flags: 'a',
  },
)

morgan.token('body', (req) => JSON.stringify(req.body))

const postLogger = [
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    { stream: accessLogStream },
  ),
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
]

module.exports = postLogger
