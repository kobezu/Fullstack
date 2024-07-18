const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('get-request returns correct number of blogs in json format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  
  
  test('blog identification is named "id"', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body
      .every((blog) => 'id' in blog), true)
  })
})


describe('addition of a new blog', () => {
  test('post-request adds the blog to the db', async () => {
    const newBlog = {
      title: 'Added blog',
      author: 'Tester',
      url: 'http://www.test.com',
      likes: 0
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Added blog'))
  })

  test('likes are set to zero when they are not given', async () => {
    const newBlog = {
      title: 'No likes',
      author: 'Tester',
      url: 'http://www.test.com'
    }

    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body
      .find((blog) => blog.title === 'No likes')
      .likes, 0)
  })

  test('Bad request when title and url are missing', async () => {
    const newBlog = {
      author: 'Tester',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    assert(blogsAtEnd.every((blog) => blog.id !== blogToDelete.id))
  })
})


describe('modification of a blog', () => {
  test('number of likes the blog has changes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const modifiedLikes = blogToModify.likes + 1

    blogToModify['likes'] = modifiedLikes

    await api.put(`/api/blogs/${blogToModify.id}`).send(blogToModify)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd
      .find((blog) => blog.id === blogToModify.id)
      .likes, modifiedLikes)
  })
})


after(async () => {
  await mongoose.connection.close()
})