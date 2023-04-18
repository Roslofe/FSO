import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotif } from './reducers/notifReducer'
import { setBlogs } from './reducers/blogReducer'
import { logOut } from './reducers/userReducer'
import { setUsers } from './reducers/allUsersReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const allUsers = useSelector((state) => state.allUsers)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
    userService.getAll().then((users) => dispatch(setUsers(users)))
  }, [])

  const blogFormRef = useRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(logOut(user))
    dispatch(updateNotif({ msg: 'logged out', isError: false }))
  }

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? allUsers.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const selectedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  const padding = {
    padding: 5,
  }

  if (user === null) {
    return <Login />
  } else {
    return (
      <div>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <span style={padding}>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </div>
        <div>
          <h1>blog app</h1>
          <Notification />
        </div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={selectedUser} />} />
          <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
          <Route
            path="/"
            element={
              <div>
                <Togglable
                  showLabel="add new blog"
                  hideLabel="cancel"
                  ref={blogFormRef}
                >
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <BlogList />
              </div>
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
