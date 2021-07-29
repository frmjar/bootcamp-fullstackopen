import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, setNotification }) => {
  const addLike = (blog) => {
    setBlogs(blogs.map(b => {
      if (b.id === blog.id) {
        b.likes++
      }
      return b
    }))
  }

  const removeBlog = (blog) => {
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => (
        <Blog
          key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}
          setNotification={setNotification}
        />
      ))}
    </div>
  )
}

export default Blogs
