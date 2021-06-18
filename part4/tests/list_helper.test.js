const listHelper = require('../utils/list_helper')
const blogs = require('./list_blogs_tests')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs.listEmpty)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty, likes equals 0', () => {
    const result = listHelper.totalLikes(blogs.listEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals likes that sum', () => {
    const result = listHelper.totalLikes(blogs.listWithManyBlogs)
    expect(result).toBe(17)
  })
})

describe('favorite blog', () => {
  test('when list is empty, likes null', () => {
    const result = listHelper.favoriteBlog(blogs.listEmpty)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(blogs.listWithOneBlog)
    expect(result).toEqual(blogs.listWithOneBlog[0])
  })

  test('when list has many blogs, equals the most likes blog', () => {
    const result = listHelper.favoriteBlog(blogs.listWithManyBlogs)
    expect(result).toEqual(blogs.favoriteBlog)
  })
})
