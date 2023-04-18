import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import userService from '../services/users'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { updateUser } from '../reducers/allUsersReducer'
import { updateNotif } from '../reducers/notifReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

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
      dispatch(updateNotif({ msg: 'Comment added', isError: false }))
      setComment('')
      dispatch
    } else {
      dispatch(
        updateNotif({
          msg: 'Commenting failed. Note: comment cannot be empty',
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
      <div className="md-3">
        <span className="pr-2">{blog.likes} likes</span>
        <Button onClick={incrementLike}>Like</Button>
      </div>
      <span>Added by {blog.user.name}</span>
      {user.username === blog.user.username && (
        <div>
          <Button id="deleteBlog" onClick={deleteBlog}>
            Delete
          </Button>
        </div>
      )}
      <h3>Comments</h3>
      <Form onSubmit={addComment} className="mb-4">
        <Form.Control
          type="text"
          name="comment"
          value={comment}
          className="mb-3"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button type="submit">add comment</Button>
      </Form>
      <ListGroup>
        {blog.comments.map((c) => (
          <ListGroup.Item key={blog.comments.indexOf(c)}>{c}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
