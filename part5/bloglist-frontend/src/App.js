import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [msg, setMsg] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const bloglistUserJSON = window.localStorage.getItem('bloglistUser')
    if (bloglistUserJSON) {
      const user = JSON.parse(bloglistUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Attempting login', username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      updateNotif('login successful', false)
    } catch (exception) {
      updateNotif('wrong username or password failed', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    updateNotif('logged out', false)
  }

  const handleBlogCreation = async (newBlog) => {
    try {
      const result = await blogService.createNew(newBlog)
      setBlogs(blogs.concat(result))
      blogFormRef.current.toggleVisibility()
      updateNotif(`a new blog ${result.title} by ${result.author} added`, false)
    } catch (exception) {
      updateNotif('adding a blog failed', true)
    }
  }

  const updateNotif = (msg, error) => {
    setError(error)
    setMsg(msg)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into application</h1>
        <Notification msg={msg} isError={isError}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type='text' value={ username } name="Username" onChange={ ({ target }) => setUsername(target.value) }/>
          </div>
          <div>
            password
            <input type='password' value={ password } name="Password" onChange={ ({ target }) => setPassword(target.value )}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  } else {
    return (
       <div>
        <h2>blogs</h2>
        <Notification msg={msg} isError={isError}/>
        <form onSubmit={handleLogout}>
          <div>
            {user.name} logged in
            <button type='submit'>logout</button>
          </div>
        </form>
        <Togglable showLabel='add new blog' hideLabel='cancel' ref={blogFormRef}>
          <BlogForm addBlog={handleBlogCreation}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App