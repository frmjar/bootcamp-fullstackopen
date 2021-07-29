import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, addLike, removeBlog, setNotification }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const blogUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    blogService.updateBlog(blogUpdate)
    addLike(blogUpdate)
  }

  const handleDelete = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      blogService.deleteBlog(blog.id).then(() => {
        removeBlog(blog)
        setNotification({
          message: `The blog ${blog.title} by ${blog.author} has been removed!`,
          type: 'success'
        })
      })
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'show'}</button>
      </div>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <div>{blog.url}</div>
        <div className='likes'>
          {blog.likes}
          <button onClick={handleLikes}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
