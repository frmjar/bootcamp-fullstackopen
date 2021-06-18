const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totales = blogs.reduce((total, blog) => total + blog.likes, 0)
  return totales
}

module.exports =
  {
    dummy,
    totalLikes
  }
