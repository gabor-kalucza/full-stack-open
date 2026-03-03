const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (_, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', userExtractor, async (request, response, next) => {
  try {
    const { likes = 0, author, title, url } = request.body || {}
    const user = request.user

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await savedBlog.populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })

    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (request, response, next) => {
  try {
    const { likes = 0 } = request.body || {}
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { returnDocument: 'after', runValidators: true },
    )

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized action' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    await User.findByIdAndUpdate(user._id, {
      $pull: { blogs: blog._id },
    })

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
