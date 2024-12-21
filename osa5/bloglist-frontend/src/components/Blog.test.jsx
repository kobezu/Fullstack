import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Test Blog',
  }

  const { container } = render(<Blog blog={blog}/>)
  
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Test Blog')
})

test('shows more information when "show" button is clicked', async () => {
  const user = {
    username: 'Tester',
    id: '1234'
  }
  const blog = {
    url: 'test.com',
    title: 'Test Blog',
    user: user,
    likes: 5
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const button = screen.getByText('show')
  await userEvent.setup().click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Test Blog')
  expect(div).toHaveTextContent('test.com')
  expect(div).toHaveTextContent('Tester')
  expect(div).toHaveTextContent('5')
})

test('like button works as expected', async () => {
  const user = {
    username: 'Tester',
    id: '1234'
  }
  const blog = {
    url: 'test.com',
    title: 'Test Blog',
    user: user,
    likes: 5
  }

  const mockHandler = vi.fn()
  const { container } = render(<Blog blog={blog} user={user} addLike={mockHandler}/>)

  const mockUser = userEvent.setup()
  const showButton = screen.getByText('show')
  await mockUser.click(showButton)

  const likeButton = screen.getByText('like')
  await mockUser.click(likeButton)
  await mockUser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})