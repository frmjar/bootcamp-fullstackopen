import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ token, blogs, setBlogs }) => {
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

    blogService.save(blog, token).then((blog) => {
      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs([...blogs, blog])
      console.log('Blog saved')
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