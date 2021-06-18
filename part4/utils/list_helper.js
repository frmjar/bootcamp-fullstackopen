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

module.exports =
  {
    dummy,
    totalLikes,
    favoriteBlog
  }
