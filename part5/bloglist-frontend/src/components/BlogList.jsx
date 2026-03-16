import Blog from './Blog'

const BlogList = ({ blogs, notify }) => {
  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} notify={notify} />
        ))}
    </>
  )
}

export default BlogList
