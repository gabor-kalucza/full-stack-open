const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const BASE_URL = '/api/blogs'

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

describe('test blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get(BASE_URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(BASE_URL)
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })

  test('post request successfully creates a new blog post', async () => {
    const initialBlogsLength = initialBlogs.length
    const newPost = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    }

    await api
      .post(BASE_URL)
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(BASE_URL)
    assert.strictEqual(response.body.length, initialBlogsLength + 1)

    const titles = response.body.map((blog) => blog.title)
    assert(titles.includes(newPost.title))
  })

  test('if like property is missing from the request, it will default to the value 0', async () => {
    const newPost = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    }

    await api
      .post(BASE_URL)
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(BASE_URL)
    assert.strictEqual(response.body[response.body.length - 1].likes, 0)
  })

  test('if the title or url is missing, the backend responds with a 400 bad request status code', async () => {
    const newPost = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
    }

    await api
      .post(BASE_URL)
      .send(newPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('delete request successfully deletes a blog post', async () => {
    const id = '5a422a851b54a676234d17f7'

    await api.delete(`${BASE_URL}/${id}`).expect(204)

    const response = await api.get(BASE_URL)
    const ids = response.body.map((blog) => blog.id)
    assert.strictEqual(response.body.length, initialBlogs.length - 1)
    assert(!ids.includes(id))
  })

  test('PUT request successfully updates a blog post likes', async (t) => {
    const { _id: id } = initialBlogs[0]
    const newLikes = 10

    const response = await api
      .put(`${BASE_URL}/${id}`)
      .send({ likes: newLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, newLikes)

    const updatedBlogInDB = await Blog.findById(id)
    assert.strictEqual(updatedBlogInDB.likes, newLikes)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
