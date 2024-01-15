import { useState } from 'react'

const Blog = ({ blog, likeBlog, show, deleteBlog }) => {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)}

  if (!view) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
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
    <b>Title: </b>{blog.title}
      <br/><b>Author: </b>{blog.author}
      <br/><b>Url: </b>{blog.url}
      <br/><b>Added by: </b>{blog.user.name}
      <br/><b>Likes: </b>{blog.likes}
      <button onClick={() => likeBlog(blog)}>like</button>
      <p></p>
      {show && (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
  </div>  
  )
}

export default Blog