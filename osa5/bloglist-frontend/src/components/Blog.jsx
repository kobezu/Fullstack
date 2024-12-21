import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [displayInfo, setDisplayInfo] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} 
      <button onClick={() => setDisplayInfo(!displayInfo)}>
        {displayInfo ? 'hide' : 'show'}
      </button>
      {
        !displayInfo ? null :
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button onClick={() => addLike(blog)}>like</button>
            </div>
            <div>{blog.user.username}</div>
            { 
              !(user.username === blog.user.username) ? null :
                <button onClick={() => deleteBlog(blog)}>remove</button> 
            }
          </div>
      }
    </div>
  )  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog