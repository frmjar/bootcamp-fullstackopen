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

describe.skip('Probando GET /api/blogs', () => {
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

describe.skip('Probando POST /api/blogs', () => {
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

describe('Probando DELETE /api/blogs', () => {
  test('delete 1 blog', async () => {
    const blogs = await api.get('/api/blogs')
    const blog = blogs.body[0]

    await api.delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listBlogs.length - 1)

    const titles = response.body.map(blog => blog.id)
    expect(titles).not.toContain(blog.id)
  })
})

describe('Probando PUT /api/blogs', () => {
  test('modify 1 blog', async () => {
    const blogs = await api.get('/api/blogs')
    const [blog] = blogs.body
    const blogToModify = { ...blog, likes: blog.likes * 2 }

    const res = await api.put(`/api/blogs/${blog.id}`)
      .send(blogToModify)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(blog.likes)

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listBlogs.length)

    const blogModify = response.body.find(blogR => blogR.id === blogToModify.id)
    expect(blogModify.likes).toBe(blogToModify.likes)
  })
})

afterAll(() => mongoose.connection.close())
