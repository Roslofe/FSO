import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    } catch (exception) {
      console.log('login failed')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      const result = await blogService.createNew(newBlog)
      setBlogs(blogs.concat(result))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('creation failed')
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into application</h1>
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
        <form onSubmit={handleLogout}>
          <div>
            {user.name} logged in
            <button type='submit'>logout</button>
          </div>
        </form>
        <h1>New blog</h1>
        <form onSubmit={handleBlogCreation}>
          <div>
            title: 
            <input type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
            author:
            <input type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          <div>
            url:
            <input type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <button type='submit'>create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App