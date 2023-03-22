import BlogInfo from "./BlogInfo"
import { useState } from "react"

const Blog = ({blog, updateBlogInfo}) => {
  const [showInfo, setShowInfo] = useState(false)

  const updateLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await updateBlogInfo(blog.id, updatedBlog)
    blog.likes = blog.likes + 1
  }

  return (
  <div>
    {blog.title} {blog.author}
    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'view' }</button>
    { showInfo && <BlogInfo blog={blog} onClick={updateLike}/>}
  </div>  
)}

export default Blog