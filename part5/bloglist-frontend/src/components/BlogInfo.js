const BlogInfo = ({ blog, onLike, user, onDelete }) => {
  return (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={(onLike)}>like</button>
      </div>
      {blog.user.name}
      { user.username === blog.user.username &&
      <div>
        <button onClick={() => onDelete(blog)}>Delete</button>
      </div>}
    </div>
  )
}

export default BlogInfo