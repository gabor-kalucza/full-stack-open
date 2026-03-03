import Blog from './Blog'

const Blogs = ({ user, setUser, blogs }) => {
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  return (
    <>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default Blogs
