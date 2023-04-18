import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import userService from '../services/users'

import { createBlog } from '../reducers/blogReducer'
import { updateNotif } from '../reducers/notifReducer'
import { updateUser } from '../reducers/allUsersReducer'

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    try {
      const result = await blogService.createNew(newBlog)
      dispatch(createBlog(result))
      const updatedUser = await userService.getOne(result.user.id)
      dispatch(updateUser(updatedUser))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      dispatch(
        updateNotif({
          msg: `A new blog ${result.title} by ${result.author} added`,
          isError: false,
        })
      )
    } catch (exception) {
      dispatch(updateNotif({ msg: 'Adding a blog failed', isError: true }))
    }
  }

  return (
    <div>
      <h1>New blog</h1>
      <Form onSubmit={newBlog}>
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control
            className="blog-title"
            type="text"
            value={title}
            name="title"
            placeholder="Insert title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Author"
          className="mb-3"
        >
          <Form.Control
            className="blog-author"
            type="text"
            value={author}
            name="author"
            placeholder="Insert author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Url" className="mb-3">
          <Form.Control
            className="blog-url"
            type="text"
            value={url}
            name="url"
            placeholder="Insert Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </FloatingLabel>
        <Button className="mb-3" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
