import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotif } from './reducers/notifReducer'
import { setBlogs } from './reducers/blogReducer'
import { logOut } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  const blogFormRef = useRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(logOut(user))
    dispatch(updateNotif({ msg: 'logged out', isError: false }))
  }

  if (user === null) {
    return <Login />
  } else {
    return (
      <div>
        <div>
          <h1>blogs</h1>
          <Notification />
          <form onSubmit={handleLogout}>
            <div>
              {user.name} logged in
              <button type="submit">logout</button>
            </div>
          </form>
        </div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route
            path="/"
            element={
              <div>
                <Link to="/users">users</Link>
                <Togglable
                  showLabel="add new blog"
                  hideLabel="cancel"
                  ref={blogFormRef}
                >
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <BlogList user={user} />
              </div>
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
