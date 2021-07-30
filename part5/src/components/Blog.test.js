import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('testing blogs info', () => {
  let component
  let addLike
  beforeEach(() => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      url: 'http://elemao.com',
      likes: 2,
      user: { name: 'ferre' }
    }

    addLike = jest.fn()

    component = render(
      <Blog blog={blog} addLike={addLike} />
    )
  })

  test('testing blog collapsed', () => {
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent(
      'Edsger'
    )
    const infoExtended = component.container.querySelector('div:nth-child(2)')

    expect(infoExtended).toHaveStyle('display: none')
  })

  test('testing blog expanded', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const infoExtended = component.container.querySelector('div:nth-child(2)')
    expect(infoExtended).toHaveStyle('display: block')
  })

  test('click the likes button', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})
