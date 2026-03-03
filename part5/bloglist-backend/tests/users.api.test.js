const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const BASE_URL = '/api/users'

describe('test user api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password123', 10)
    await new User({ username: 'tomas', passwordHash }).save()
  })

  test('users are returned as json', async () => {
    await api
      .get(BASE_URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with missing password', async () => {
    const newUser = { username: 'newuser', name: 'New User' }
    const response = await api.post(BASE_URL).send(newUser).expect(400)
    assert(
      response.body.error.includes(
        'password must be at least 3 characters long',
      ),
    )
  })

  test('fails with missing username', async () => {
    const newUser = {
      name: 'New User',
      password: 'password123',
    }

    const response = await api.post(BASE_URL).send(newUser).expect(400)

    assert(
      response.body.error.includes(
        'username must be at least 3 characters long',
      ),
    )
  })

  test('fails with non-unique username', async () => {
    const newUser = {
      username: 'tomas',
      name: 'Tomas Duplicate',
      password: 'password123',
    }

    const response = await api.post(BASE_URL).send(newUser).expect(400)
    assert(response.body.error.includes('expected `username` to be unique'))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
