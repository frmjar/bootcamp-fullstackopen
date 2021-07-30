import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test.skip('testing blog collapsed', () => {
  const setBlogs = jest.fn()

  const component = render(
    <BlogForm setBlogs={setBlogs} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('input[name="title"]')
  const author = component.container.querySelector('input[name="author"]')
  const url = component.container.querySelector('input[name="url"]')

  fireEvent.change(title, { target: { value: 'probando esto' } })
  fireEvent.change(author, { target: { value: 'manolo' } })
  fireEvent.change(url, { target: { value: 'https://github.com' } })

  fireEvent.submit(form)

  expect(setBlogs.mock.calls[0][0].title).toBe('probando esto')
  expect(setBlogs.mock.calls[0][0].author).toBe('probando esto')
  expect(setBlogs.mock.calls[0][0].url).toBe('probando esto')
})
