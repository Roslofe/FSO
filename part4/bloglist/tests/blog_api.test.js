const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
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

test('if likes-property is missing, defaulted to 0', async () => {
  const newBlog = {
    title: helper.newBlog.title,
    author: helper.newBlog.author,
    url: helper.newBlog.url
  }

  const addedBlog = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  expect(addedBlog.body.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})