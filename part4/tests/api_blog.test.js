const { app, mongoose } = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogsInMongo } = require('./helpers')
const { listBlogs, blogToAdd } = require('./list_blogs_tests')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const user = await User.findOne()
  const blogs = listBlogs.map(blog => {
    blog.user = user._id
    return new Blog(blog)
  })
  const blogsSavePromise = blogs.map(blog => blog.save())
  const blogSave = await Promise.all(blogsSavePromise)

  for (const blog of blogSave) {
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
  }
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

describe.skip('Probando POST /api/blogs', () => {
  test('coleccion vacia', async () => {
    await Blog.deleteMany({})
    const user = await User.findOne()
    blogToAdd.user = user._id

    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInMongo()

    expect(response).toHaveLength(1)

    const titles = response.map(blog => blog.title)
    expect(titles).toContain(blogToAdd.title)
  })

  test('coleccion llena', async () => {
    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInMongo()
    expect(response).toHaveLength(listBlogs.length + 1)

    const titles = response.map(blog => blog.title)
    expect(titles).toContain(blogToAdd.title)
  })

  test.skip('if likes is undefined, expect likes equal 0', async () => {
    delete blogToAdd.likes
    await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInMongo()
    expect(response).toHaveLength(listBlogs.length + 1)

    const titles = response.find(blog => blog.title === blogToAdd.title)
    expect(titles.likes).toBe(0)
  })

  test.skip('if title or url is undefined, expect error 400', async () => {
    delete blogToAdd.title
    delete blogToAdd.url
    const error = await api.post('/api/blogs')
      .send(blogToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('title or url missing')

    const response = await blogsInMongo()
    expect(response).toHaveLength(listBlogs.length)
  })
})

describe.skip('Probando DELETE /api/blogs', () => {
  test('delete 1 blog', async () => {
    const blogs = await api.get('/api/blogs')
    const blog = blogs.body[0]

    await api.delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const response = await blogsInMongo()
    expect(response).toHaveLength(listBlogs.length - 1)

    const titles = response.map(blog => blog.id)
    expect(titles).not.toContain(blog.id)
  })
})

describe.skip('Probando PUT /api/blogs', () => {
  test('modify 1 blog', async () => {
    const blogs = await api.get('/api/blogs')
    const [blog] = blogs.body
    const blogToModify = { ...blog, likes: blog.likes * 2 }

    const res = await api.put(`/api/blogs/${blog.id}`)
      .send(blogToModify)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(blog.likes)

    const response = await blogsInMongo()
    expect(response).toHaveLength(listBlogs.length)

    const blogModify = response.find(blogR => blogR.id === blogToModify.id)
    expect(blogModify.likes).toBe(blogToModify.likes)
  })
})

afterAll(() => mongoose.connection.close())
