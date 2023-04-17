import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotif } from './reducers/notifReducer'
import { setBlogs } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Attempting login', username, password)
    try {
      const newUser = await loginService.login({ username, password })
      console.log('got user')
      window.localStorage.setItem('bloglistUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUsername('')
      setPassword('')
      dispatch(logIn(newUser))
      dispatch(updateNotif({ msg: 'login successful', isError: false }))
    } catch (exception) {
      dispatch(
        updateNotif({ msg: 'wrong username or password', isError: true })
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(logOut(user))
    dispatch(updateNotif({ msg: 'logged out', isError: false }))
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into application</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="Username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="Password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login" type="submit">
            login
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <form onSubmit={handleLogout}>
          <div>
            {user.name} logged in
            <button type="submit">logout</button>
          </div>
        </form>
        <Togglable
          showLabel="add new blog"
          hideLabel="cancel"
          ref={blogFormRef}
        >
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <BlogList user={user} />
      </div>
    )
  }
}

export default App
