import debounce from 'debounce'
import { useMemo, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, notify }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const debouncedNotify = useMemo(
    () => debounce((msg, type) => notify(msg, type), 1000),
    [notify],
  )

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = async (id) => {
    try {
      await blogService.update(id, {
        ...blog,
        likes: likes + 1,
      })

      setLikes((prevLikes) => prevLikes + 1)
      debouncedNotify(`you liked ${blog.title} by ${blog.author}`)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'something went wrong'
      debouncedNotify(errorMessage, 'error')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      <div>
        {showDetails && (
          <>
            <a href={blog.url} target='_blank'>
              {blog.url}
            </a>
            <div>
              <span>likes {likes}</span>{' '}
              <button onClick={() => updateLikes(blog.id)}>Like</button>
            </div>

            <div>{blog.user && blog.user.name}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Blog
