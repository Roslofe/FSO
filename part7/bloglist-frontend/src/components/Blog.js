import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import userService from '../services/users'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { updateUser } from '../reducers/allUsersReducer'
import { setNotif, updateNotif } from '../reducers/notifReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const user = useSelector((state) => state.user)

  const incrementLike = async () => {
    const updated = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.updateLikes(blog.id, updated)
    dispatch(updateBlog({ ...updated, user: blog.user }))
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

  const addComment = async (event) => {
    event.preventDefault()
    const withComment = {
      ...blog,
      comments: [...blog.comments, comment],
      user: blog.user.id,
    }
    const response = await blogService.addComment(blog.id, withComment)
    if (response.status === 200) {
      dispatch(updateBlog({ ...withComment, user: blog.user }))
      dispatch(setNotif({ msg: 'comment added', isError: false }))
      setComment('')
    } else {
      dispatch(
        setNotif({
          msg: 'commenting failed. Note: comment cannot be empty',
          isError: true,
        })
      )
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={blog.comments.indexOf(c)}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
