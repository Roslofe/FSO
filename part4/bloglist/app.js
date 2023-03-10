const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected')
  })
  .catch((error) => {
    logger.error('error in connection', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)

module.exports = app