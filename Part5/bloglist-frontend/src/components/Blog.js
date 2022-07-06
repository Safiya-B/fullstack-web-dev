import React, { useEffect, useState } from "react"
import blogs from "../services/blogs"
import blogService from "../services/blogs"
import Togglable from "./Togglable"

const Blog = ({ blog, setRefresh, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLikes = async () => {
    const values = {
      ...blog,
      user: blog.user.id,
    }
    delete values.id
    try {
      await blogService.increaseLikes(values, blog.id)
      setRefresh(new Date())
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post ?"))
      try {
        await blogService.deletePost(blog.id)
        setRefresh(new Date())
      } catch (err) {
        console.log(err)
      }
  }

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        width: "50%",
        marginTop: "5px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div>{blog.title}</div>
        {showDetails ? (
          <button onClick={() => setShowDetails(false)}>hide</button>
        ) : (
          <button onClick={() => setShowDetails(true)}>view</button>
        )}
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes ? blog.likes : 0}
            <span>
              <button onClick={handleLikes}>like</button>
            </span>
          </div>
          <div>{blog.author}</div>
          {user.name === blog.user.name && (
            <button onClick={handleDeletePost}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
