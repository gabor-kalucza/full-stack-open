import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
            <div>{blog.url}</div>
            <div>likes {blog.likes}</div>
            <div>{blog.user && blog.user.name}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Blog
