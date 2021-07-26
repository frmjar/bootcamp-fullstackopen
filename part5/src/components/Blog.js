import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    blog.likes++
    blog.user = blog.user.id

    blogService.updateBlog(blog)
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
      </div>
    </div>
  )
}

export default Blog
