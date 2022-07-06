import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [info, setInfo] = useState({ error: false, message: "" })
  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [refresh])

  return (
    <div>
      {user === null ? (
        <Login user={user} setUser={setUser} info={info} setInfo={setInfo} />
      ) : (
        <div>
          {info && (
            <p style={info.error ? { color: "red" } : { color: "green" }}>
              {info.message}
            </p>
          )}
          <h2>blogs</h2>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              setInfo={setInfo}
              blogFormRef={blogFormRef}
              setRefresh={setRefresh}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              setRefresh={setRefresh}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
