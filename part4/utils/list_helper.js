const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, (blog) => blog.author)
  const authorCountBlogs = _.transform(authors, (authorCountBlogs, blogs, author) => {
    return authorCountBlogs.blogs > blogs.length
      ? authorCountBlogs
      : { author: author, blogs: blogs.length }
  }, {})

  console.log(authorCountBlogs)

  return authorCountBlogs
}

module.exports =
  {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }
