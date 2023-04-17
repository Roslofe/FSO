import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user, onDelete }) => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} onDelete={onDelete} />
        ))}
    </>
  )
}

export default BlogList
