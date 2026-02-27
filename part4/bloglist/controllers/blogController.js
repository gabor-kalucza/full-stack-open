const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const { likes = 0, author, title, url } = request.body || {}

  if (!title || !url) {
    response.status(400).json({ error: 'title and url are required' })
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

router.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

  if (!deletedBlog) {
    response.status(404).json({ error: 'Blog not found' })
  }
  response.status(204).end()
})

module.exports = router
