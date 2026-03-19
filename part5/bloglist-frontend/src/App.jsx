import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const notify = (message, type = 'success') => {
    setNotification({ text: message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const onSuccess = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : 'something went wrong'

      notify(errorMessage, 'error')
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {!user && (
        <>
          <h1>login in to application</h1>
          <Notification message={notification} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          <h2>create new</h2>
          <Notification message={notification} />
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <CreateBlogForm
              setBlogs={setBlogs}
              notify={notify}
              onSuccess={onSuccess}
            />
          </Togglable>
          <br />
          <BlogList
            blogs={blogs}
            notify={notify}
            setBlogs={setBlogs}
            user={user}
          />
        </>
      )}
    </div>
  )
}

export default App
