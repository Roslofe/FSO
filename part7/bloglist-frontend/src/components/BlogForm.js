import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    await addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div>
      <h1>New blog</h1>
      <form onSubmit={createBlog}>
        <div>
            title:
          <input className='blog-title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:
          <input className='blog-author' type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:
          <input className='blog-url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm