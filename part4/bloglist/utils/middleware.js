const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorisation = request.get('authorization')
  if (authorisation && authorisation.startsWith('Bearer ')) {
    request.token =  authorisation.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}