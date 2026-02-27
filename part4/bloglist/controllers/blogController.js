const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const { likes = 0, author, title, url } = request.body || {}

  if (!title || !author || !url) {
    response.status(400).json({ error: 'title, author and url are required' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = router
