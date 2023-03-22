const BlogInfo = ({ blog }) => {
  return (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button>like</button>
      </div>
      {blog.user.name}
    </div>
  )
}

export default BlogInfo