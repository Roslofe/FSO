const BlogInfo = ({ blog, onClick }) => {

  return (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={(onClick)}>like</button>
      </div>
      {blog.user.name}
    </div>
  )
}

export default BlogInfo