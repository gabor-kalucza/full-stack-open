import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ setBlogs }) => {
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
    const data = await blogService.create(blog)
    setBlogs((prevBlogs) => [...prevBlogs, data])
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
