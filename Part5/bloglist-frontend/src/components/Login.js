import React, { useState, useEffect } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const Login = ({ user, setUser, info, setInfo }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser")

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }

    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
    } catch (err) {
      setInfo({ error: true, message: err.response.data.error })
      setTimeout(() => {
        setInfo(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        {info && <p style={{ color: "red" }}>{info.message}</p>}
        <div>
          <label>username</label>{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  )
}

export default Login
