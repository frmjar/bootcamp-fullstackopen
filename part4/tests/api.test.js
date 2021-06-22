const { app, mongoose } = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listBlogs, blogToAdd } = require('./list_blogs_tests')

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

  test('verificacion id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Probando POST /api/blogs', () => {
  test('coleccion vacia', async () => {
    await Blog.deleteMany({})

    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(blogToAdd.title)
  })

  test('coleccion llena', async () => {
    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listBlogs.length + 1)

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(blogToAdd.title)
  })

  test('if likes is undefined, expect likes equal 0', async () => {
    delete blogToAdd.likes
    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listBlogs.length + 1)

    const titles = response.body.find(blog => blog.title === blogToAdd.title)
    expect(titles.likes).toBe(0)
  })

  test('if title or url is undefined, expect error 400', async () => {
    delete blogToAdd.title
    delete blogToAdd.url
    const error = await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('title or url missing')

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listBlogs.length)
  })
})

afterAll(() => mongoose.connection.close())
