const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper =require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await api.post('/api/users')
    .send(helper.initialUser)
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
    test('adding blogs without token returns 401', async () => {
      await api.post('/api/blogs')
        .send(helper.newBlog)
        .expect(401)
    })

    test('new blogs should be able to be added', async () => {
      const user = await api.post('/api/login')
        .send(helper.initialUser)
      const token = 'Bearer ' + user.body.token
      await api.post('/api/blogs')
        .set('Authorization', token)
        .send(helper.newBlog)
        .expect(201)
      const apiBlogs = await helper.blogsInDb()
      expect(apiBlogs).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('if likes-property is missing, defaulted to 0', async () => {
      const user = await api.post('/api/login')
        .send(helper.initialUser)
      const token = 'Bearer ' + user.body.token

      const newBlog = {
        title: helper.newBlog.title,
        author: helper.newBlog.author,
        url: helper.newBlog.url
      }

      const addedBlog = await api.post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)

      expect(addedBlog.body.likes).toBe(0)
    })

    describe('when adding faulty entries', () => {
      test('adding a blog with no title responds with status 400', async () => {
        const user = await api.post('/api/login')
          .send(helper.initialUser)
        const token = 'Bearer ' + user.body.token
        const faultyBlog = {
          author: helper.newBlog.author,
          url: helper.newBlog.url
        }

        await api.post('/api/blogs')
          .set('Authorization', token)
          .send(faultyBlog)
          .expect(400)
      })

      test('adding a blog with no url responds with status 400', async () => {
        const user = await api.post('/api/login')
          .send(helper.initialUser)
        const token = 'Bearer ' + user.body.token
        const faultyBlog = {
          title: helper.newBlog.title,
          author: helper.newBlog.author
        }

        await api.post('/api/blogs')
          .set('Authorization', token)
          .send(faultyBlog)
          .expect(400)
      })
    })
  })

  describe('deleting posts', () => {
    test('blogs can be deleted', async () => {
      const user = await api.post('/api/login')
        .send(helper.initialUser)
      const token = 'Bearer ' + user.body.token

      //Add the new blog
      const blog = await api.post('/api/blogs')
        .set('Authorization', token)
        .send(helper.newBlog)
        .expect(201)
      const initialBlogs = await helper.blogsInDb()
      expect(initialBlogs).toHaveLength(helper.initialBlogs.length + 1)
      await api.delete(`/api/blogs/${blog.body.id}`)
        .set('Authorization', token)
        .expect(204)
      const finalBlogs = await helper.blogsInDb()
      //Should be the same since one was added and deleted
      expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
      expect(finalBlogs.filter(b => b.id === blog.body.id)).toHaveLength(0)
    })
  })

  describe('updating posts', () => {
    test('blogs can be updated', async () => {
      const updated = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
      }

      const initialBlog = helper.initialBlogs[0]
      const updateRes = await api.put(`/api/blogs/${initialBlog._id}`)
        .send(updated)
        .expect(200)
      expect(updateRes.body.likes).toBe(10)
    })

    test('updating nonexistent blogs should not work', async () => {
      const user = await api.post('/api/login')
        .send(helper.initialUser)
      const token = 'Bearer ' + user.body.token

      const deletedBlog = await api.post('/api/blogs')
        .set('Authorization', token)
        .send(helper.newBlog)
      await api.delete(`/api/blogs/${deletedBlog.body.id}`)
        .set('Authorization', token)
        .expect(204)
      await api.put(`/api/blogs/${deletedBlog.body.id}`)
      const allBlogs = await helper.blogsInDb()
      expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})