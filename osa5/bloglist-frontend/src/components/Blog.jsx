import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, show, deleteBlog }) => {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)}

  if (!view) {
    return (
      <div>
        <b>Title: </b><span>{blog.title}</span>
        <br></br>
        <b>Author: </b><span>{blog.author}</span>
        <br></br>
        <button onClick={toggleView}>view</button>
        <br></br>
        <br></br>
      </div>
    )}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style= {blogStyle}>
      <button onClick={toggleView}>hide</button>
      <p></p>
      <br/><b>Title: </b>{blog.title}
      <br/><b>Author: </b>{blog.author}
      <span><br/><b>Url: </b>{blog.url}</span>
      <span><br/><b>Added by: </b>{blog.user.name}</span>
      <span><br/><b>Likes: </b>{blog.likes}</span>
      <button onClick={() => likeBlog(blog)}>like</button>
      <p></p>
      {show && (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog