const { app, mongoose } = require('../app')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const { usersInMongo } = require('./helpers')
const { listUsers, userToAdd } = require('./list_users_tests')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const usersPromise = listUsers.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const userMongo = new User({
      name: user.name,
      passwordHash: passwordHash,
      username: user.username
    })
    return userMongo
  })

  const users = await Promise.all(usersPromise)
  const usersSave = users.map(user => user.save())
  await Promise.all(usersSave)
})

describe.skip('Probando GET /api/users', () => {
  test('coleccion vacia', async () => {
    await User.deleteMany({})
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(0)
  })

  test('coleccion llena', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(listUsers.length)
  })
})

describe.skip('Probando POST /api/blogs', () => {
  test('coleccion vacia', async () => {
    await User.deleteMany({})

    await api.post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await usersInMongo()

    expect(response).toHaveLength(1)

    const usernames = response.map(user => user.username)
    expect(usernames).toContain(userToAdd.username)
  })

  test('coleccion llena', async () => {
    await api.post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await usersInMongo()

    expect(response).toHaveLength(listUsers.length + 1)

    const usernames = response.map(user => user.username)
    expect(usernames).toContain(userToAdd.username)
  })

  test('if username is undefined, expect error', async () => {
    delete userToAdd.username
    const error = await api.post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('username or password undefined')

    const response = await usersInMongo()
    expect(response).toHaveLength(listUsers.length)
  })

  test('if password is undefined, expect error', async () => {
    delete userToAdd.password
    const error = await api.post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('username or password undefined')

    const response = await usersInMongo()
    expect(response).toHaveLength(listUsers.length)
  })

  test('if username is less than 3 characters, expect error', async () => {
    userToAdd.password = 'viva_Espana'
    userToAdd.username = 'as'
    const error = await api.post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toContain('username: Must be at least 3, got')

    const response = await usersInMongo()
    expect(response).toHaveLength(listUsers.length)
  })

  test('if password is less than 3 characters, expect error', async () => {
    userToAdd.username = 'Manolito'
    userToAdd.password = 'as'
    const error = await api.post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('the password must be at least 3 characters long')

    const response = await usersInMongo()
    expect(response).toHaveLength(listUsers.length)
  })
})

afterAll(() => mongoose.connection.close())
