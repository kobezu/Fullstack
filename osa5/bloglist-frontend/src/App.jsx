import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { Error, Notification } from './components/Message'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (text) => {
    setNotification(text)
    setTimeout(() => setNotification(null), 5000)
  }

  const displayError = (text) => {
    console.log('test')
    setError(text)
    setTimeout(() => setError(null), 5000)
  }

  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)

    } catch (exception) {
      displayError('wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out with', user.username)

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogObject)
    
    const blogs = await blogService.getAll()
    setBlogs(blogs)

    displayNotification(`a new blog ${createdBlog.title}`)
  }
  
  const addLike = async (blogObject) => {
    blogObject.likes += 1
    const updatedBlog = await blogService.put(blogObject)
    
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      const deletedBlog = await blogService.deleteBlog(blogObject)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  if (!user) {
    return (
      <div>
        <Error message={error}/>
        <Notification message={notification}/>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <Error message={error}/>
      <Notification message={notification}/>
      <h2>blogs</h2>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div><br/><br/>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} 
            addLike={addLike} deleteBlog={deleteBlog}/>
        ))}
    </div>
  )
}

export default App