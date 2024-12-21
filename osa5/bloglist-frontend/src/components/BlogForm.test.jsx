import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog form gives callback function correct information', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing title...' )
  await user.type(author, 'testing author...' )
  await user.type(url, 'testing url...' )
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'testing title...',
    author: 'testing author...',
    url: 'testing url...'
  })
})