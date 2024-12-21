import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='write title here'
        />
      </div>
      <div>
        author: 
        <input
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder='write author here'
        />
      </div>
      <div>
        url: 
        <input
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder='write url here'
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm