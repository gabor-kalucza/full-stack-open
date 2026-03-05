import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ setBlogs, notify, onSuccess }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleInputChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await blogService.create(blog)
      setBlogs((prevBlogs) => [...prevBlogs, data])
      notify(`a new blog ${data.title} by ${data.author} added`)
      setBlog({ title: '', author: '', url: '' })
      onSuccess()
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'something went wrong'
      notify(errorMessage, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title:
          <input
            name='title'
            type='text'
            value={blog.title}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            name='author'
            type='text'
            value={blog.author}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            name='url'
            type='text'
            value={blog.url}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button>create</button>
    </form>
  )
}

export default CreateBlogForm
