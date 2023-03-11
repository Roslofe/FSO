const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper =require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('get returns correct blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('blogs should have id property', async () => {
  const response = await helper.blogsInDb()
  expect(response[0].id).toBeDefined()
})

test('new blogs should be able to be added', async () => {
  await api.post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
  const apiBlogs = await helper.blogsInDb()
  expect(apiBlogs).toHaveLength(3)
})

afterAll(async () => {
  await mongoose.connection.close()
})