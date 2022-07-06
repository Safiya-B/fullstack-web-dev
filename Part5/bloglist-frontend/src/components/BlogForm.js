import React, { useState, useRef } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ setInfo, blogFormRef, setRefresh }) => {
  const [values, setValues] = useState({
    title: "",
    author: "",
    url: "",
  })

  const createBlogPost = async (e) => {
    e.preventDefault()

    try {
      const { data } = await blogService.create(values)
      setInfo({
        error: false,
        message: `successfully added ${data.title} by ${data.author}`,
      })
      setRefresh(new Date())
      blogFormRef.current.toggleVisibility()
      setValues({ title: "", author: "", url: "" })
      setTimeout(() => {
        setInfo(null)
      }, 5000)
    } catch (err) {
      console.log(err)
      setInfo({ error: true, message: err.response.data.error })
      setTimeout(() => {
        setInfo(null)
      }, 5000)
    }
  }

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlogPost}>
        <div>
          <label htmlFor=""> title:</label>
          <input
            type="text"
            value={values.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=""> author:</label>
          <input
            type="text"
            value={values.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=""> url:</label>
          <input
            type="text"
            value={values.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
  )
}

export default BlogForm
