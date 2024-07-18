const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right',
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  )
})

describe('blog with most likes', () => {
  test('when list has only one blog it is that', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog),
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('of a bigger list is correct', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )
  })
})

describe('author with most blogs', () => {
  test('when list has only one blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog),
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )
  })

  test('is correct with bigger list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs),
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})

describe('author with most likes', () => {
  test('when list has only one blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog),
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('is correct with bigger list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs),
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})

