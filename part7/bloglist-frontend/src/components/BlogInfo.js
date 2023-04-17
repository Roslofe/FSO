import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { updateNotif } from '../reducers/notifReducer'

const BlogInfo = ({ blog, user }) => {
  const dispatch = useDispatch()

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
        dispatch(updateNotif({ msg: `Deleted ${blog.title}`, isError: false }))
      } else {
        dispatch(
          updateNotif({ msg: `Deleting ${blog.title} failed`, isError: true })
        )
      }
    }
  }

  return (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={incrementLike}>like</button>
      </div>
      {blog.user.name}
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

export default BlogInfo
