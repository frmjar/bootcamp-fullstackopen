const { app, mongoose } = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listBlogs } = require('./list_blogs_tests')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = listBlogs.map(blog => new Blog(blog))
  const blogsSave = blogs.map(blog => blog.save())
  await Promise.all(blogsSave)
})

describe('Probando GET /api/blogs', () => {
  test('coleccion vacia', async () => {
    await Blog.deleteMany({})
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(0)
  })

  test('coleccion llena', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(listBlogs.length)
  })
})

afterAll(() => mongoose.connection.close())
