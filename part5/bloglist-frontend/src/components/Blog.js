import BlogInfo from "./BlogInfo"
import { useState } from "react"

const Blog = ({blog}) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
  <div>
    {blog.title} {blog.author}
    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'view' }</button>
    { showInfo && <BlogInfo blog={blog}/>}
  </div>  
)}

export default Blog