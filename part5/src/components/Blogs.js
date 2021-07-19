import Blog from './Blog'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
