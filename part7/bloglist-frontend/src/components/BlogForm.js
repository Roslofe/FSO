import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'

import { createBlog } from '../reducers/blogReducer'
import { updateNotif } from '../reducers/notifReducer'

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
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      dispatch(
        updateNotif({
          msg: `a new blog ${result.title} by ${result.author} added`,
          isError: false,
        })
      )
    } catch (exception) {
      dispatch(updateNotif({ msg: 'adding a blog failed', isError: true }))
    }
  }

  return (
    <div>
      <h1>New blog</h1>
      <form onSubmit={newBlog}>
        <div>
          title:
          <input
            className="blog-title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            className="blog-author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            className="blog-url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
