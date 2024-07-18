const collection = require('lodash/collection')

const totalLikes = (blogs) => {
  return (
    blogs.reduce((sum, item) => {
      return sum + item.likes
    }, 0)
  )
}

const favoriteBlog = (blogs) => {
  const { title, author, likes } =
    blogs.reduce((max, current) => {
      return max.likes > current.likes ? max : current
    }, { likes: 0 })

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const countsByAuthor = collection.countBy(blogs, (blog) => blog.author)
    const author = Object.keys(countsByAuthor).reduce((max, current) => {
      return countsByAuthor[max] > countsByAuthor[current] ? max : current
    })

    return {
      author,
      blogs: countsByAuthor[author]
    }
  }
  else return null
}

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const blogsByAuthor = collection.groupBy(blogs, (blog) => blog.author)

    const likesByAuthor = Object.keys(blogsByAuthor).map((author) => {
      const likes = blogsByAuthor[author]
        .reduce((sum, current) => {
          return sum + current.likes
        }, 0)
      return { author, likes }
    })

    return likesByAuthor.reduce((max, current) => {
      return max.likes > current.likes ? max : current
    }, { likes: 0 })
  }
  else return null
}



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}