import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Nav from './components/Navbar'
import blogService from './services/blogs'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUsers } from './reducers/allUsersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

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

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? allUsers.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const selectedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  if (user === null) {
    return <Login />
  } else {
    return (
      <div className="container">
        <Nav />
        <div>
          <h1>Blog app</h1>
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
                  showLabel="Add new blog"
                  hideLabel="Cancel"
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
