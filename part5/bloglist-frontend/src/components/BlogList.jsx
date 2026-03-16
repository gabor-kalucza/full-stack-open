import Blog from './Blog'

const BlogList = ({ blogs, notify, setBlogs }) => {
  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} notify={notify} setBlogs={setBlogs} />
        ))}
    </>
  )
}

export default BlogList
