import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ setBlogs, setNotification }) => {
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

      setNotification({
        text: `a new blog "${data.title}" by ${data.author} added`,
        type: 'success',
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlog({ title: '', author: '', url: '' })
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'something went wrong'

      setNotification({
        text: errorMessage,
        type: 'error',
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
