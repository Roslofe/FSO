import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ updateBlogInfo, user, onDelete }) => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogInfo={updateBlogInfo}
            user={user}
            onDelete={onDelete}
          />
        ))}
    </>
  )
}

export default BlogList
