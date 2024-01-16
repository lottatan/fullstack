import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logged in with', username, password)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {setErrorMessage(null)}, 2000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setSuccessMessage(`New blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {setSuccessMessage(null)}, 2000)
    setNewBlog('')
  }

  const likeBlog = async (blogObject) => {
    const blog = {
      ...blogObject,
      likes: blogObject.likes+1
    }
    await blogService.like(blog)
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Do you want to remove ${blogObject.title}?`)) {
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))}
  }

  return (
    <div>
      <Notification message={errorMessage} type='error' />
      <Notification message={successMessage} type='success' />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <h2>blogs</h2>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} show={user.name === blog.user.name} deleteBlog={deleteBlog}/>
        )}
      </div>
      }
      {!user && (
        <div>
          <h2>blogs</h2>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
          )}
        </div>
      )}
    </div>
  )
}

export default App