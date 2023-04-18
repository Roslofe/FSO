import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import userService from '../services/users'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { updateUser } from '../reducers/allUsersReducer'
import { updateNotif } from '../reducers/notifReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const incrementLike = async () => {
    const updated = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.updateLikes(blog.id, updated)
    dispatch(likeBlog(blog.id))
  }

  const deleteBlog = async () => {
    const isSure = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (isSure) {
      const deleteSuccess = (await blogService.deleteBlog(blog)).status
      if (deleteSuccess === 204) {
        dispatch(removeBlog(blog.id))
        const updatedUser = await userService.getOne(blog.user.id)
        dispatch(updateUser(updatedUser))
        navigate('/')
        dispatch(updateNotif({ msg: `Deleted ${blog.title}`, isError: false }))
      } else {
        dispatch(
          updateNotif({ msg: `Deleting ${blog.title} failed`, isError: true })
        )
      }
    }
  }

  if (!(blog && user)) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={incrementLike}>like</button>
      </div>
      <span>added by {blog.user.name}</span>
      {user.username === blog.user.username && (
        <div>
          <button id="deleteBlog" onClick={deleteBlog}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
