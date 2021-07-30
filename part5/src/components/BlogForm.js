import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification, toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    blogService.save(blog).then((blog) => {
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleRef.current.toggleChild()
      setBlogs([...blogs, blog])
      console.log('Blog saved')
      setNotification({
        message: `A new blog ${blog.title} by ${blog.author} has been saved!`,
        type: 'success'
      })
    }).catch((error) => {
      console.log(error)
      setNotification({
        message: error.response.data.error,
        type: 'error'
      })
    })
  }
  return (
    <div>

      <h1>Create new blog</h1>

      <form onSubmit={submitBlog}>
        <div>
          <label>Title</label>
          <input
            type='text' name='title' value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type='text' name='author' value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>url</label>
          <input
            type='text' name='url' value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
