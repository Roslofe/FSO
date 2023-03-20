import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Attempting login', username, password)
    try {
      const user = await loginService.login({ username, password })
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
    setUser(null)
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App