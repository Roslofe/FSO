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

describe('when there is initially some blogs saved', () => {
  test('get returns correct blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs should have id property', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
  })

  describe('adding new blogs', () => {
    test('new blogs should be able to be added', async () => {
      await api.post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
      const apiBlogs = await helper.blogsInDb()
      expect(apiBlogs).toHaveLength(helper.initialBlogs.length + 1)
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

    describe('when adding faulty entries', () => {
      test('adding a blog with no title responds with status 400', async () => {
        const faultyBlog = {
          author: helper.newBlog.author,
          url: helper.newBlog.url
        }

        await api.post('/api/blogs')
          .send(faultyBlog)
          .expect(400)
      })

      test('adding a blog with no url responds with status 400', async () => {
        const faultyBlog = {
          title: helper.newBlog.title,
          author: helper.newBlog.author
        }

        await api.post('/api/blogs')
          .send(faultyBlog)
          .expect(400)
      })
    })
  })

  describe('deleting posts', () => {
    test('blogs can be deleted', async () => {
      await api.delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(204)
      const finalBlogs = await helper.blogsInDb()
      expect(finalBlogs).toHaveLength(helper.initialBlogs.length - 1)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})