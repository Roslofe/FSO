const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper =require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('With one initial user', () => {
  test('correctly formatted user is created', async () => {
    await api.post('/api/users')
      .send(helper.newUser)
      .expect(201)
  })

  test('user with no password is not created', async () => {
    const result = await api.post('/api/users')
      .send({ username: helper.newUser.username, name: helper.newUser.name })
      .expect(400)
    expect(result.body.error).toBe('Password must be at least 3 characters long')
  })

  test('user with no username is not created', async () => {
    await api.post('/api/users')
      .send({ name: helper.newUser.name, password: helper.newUser.password })
      .expect(400)
  })

  test('username with less than 3 characters is not created', async () => {
    await api.post('/api/users')
      .send({ username: 'sh', name: helper.newUser.name, password: helper.newUser.password })
      .expect(400)
  })

  test('duplicate usernames are not created', async () => {
    await api.post('/api/users')
      .send(helper.newUser)
      .expect(201)
    await api.post('/api/users')
      .send(helper.newUser)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})