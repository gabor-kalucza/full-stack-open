import Blog from './Blog'

const BlogList = ({ blogs, notify, setBlogs, user }) => {
  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            notify={notify}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
    </>
  )
}

export default BlogList
