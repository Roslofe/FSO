const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length) {
    const byAuthor = lodash.countBy(blogs, blog => blog.author)
    const authors = Object.keys(byAuthor)
    const blogNums = Object.values(byAuthor)
    const maxBlogs = Math.max(...blogNums)
    const mostIndex = blogNums.findIndex(n => n === maxBlogs)

    return { author: authors[mostIndex], blogs: maxBlogs }
  } else {
    return undefined
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}