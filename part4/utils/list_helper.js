const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, (blog) => blog.author)
  const authorCountBlogs = _.transform(authors, (authorCountBlogs, blogs, author) => {
    if (authorCountBlogs.blogs < blogs.length) {
      authorCountBlogs.blogs = blogs.length
      authorCountBlogs.author = author
    }
  }, { blogs: 0 })

  return authorCountBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, (blog) => blog.author)
  const authorCountBlogs = _.transform(authors, (authorCountBlogs, blogs, author) => {
    const likes = blogs.reduce((likes, blog) => likes + blog.likes, 0)

    if (authorCountBlogs.likes < likes) {
      authorCountBlogs.likes = likes
      authorCountBlogs.author = author
    }
  }, { likes: 0 })

  return authorCountBlogs
}

module.exports =
  {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
