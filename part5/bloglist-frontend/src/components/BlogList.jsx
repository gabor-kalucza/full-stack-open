import Blog from './Blog'

const BlogList = ({ blogs, notify }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} notify={notify} />
      ))}
    </>
  )
}

export default BlogList
