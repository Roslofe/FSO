const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

const validator = (val) => {
  if (!val.includes('-')) {
    return false
  }
  const splitNum = val.split('-')
  if (splitNum.length === 2) {
    if (splitNum[0].length >= 2 && splitNum[0].length <= 3) {
      return +splitNum[0] && +splitNum[1]
    }
  }
  return false
}

mongoose.connect(url)
  .then(result => {
    console.log(`MongoDB connection to database ${result.connections[0].name} successful`)
  })
  .catch((error) => {
    console.log('MongoDB connection failed', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: { validator: validator, msg: 'Phone number format is incorrect' },
    minLength: 8,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

