import BlogInfo from './BlogInfo'
import { useState } from 'react'

const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="blogContent">
      {blog.title} {blog.author}
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'view'}
      </button>
      {showInfo && <BlogInfo blog={blog} user={user} />}
    </div>
  )
}

export default Blog
