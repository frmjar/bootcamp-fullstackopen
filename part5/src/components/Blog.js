import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'show'}</button>
      </div>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
