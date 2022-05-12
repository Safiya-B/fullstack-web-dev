const usersRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const logger = require("../utils/logger")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      url: 1,
      title: 1,
      author: 1,
    })
    return res.json(users)
  } catch (error) {
    return next(error)
  }
})

usersRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body

  if (!username || !name || !password)
    return res.status(400).json({ error: "username or password missing" })

  if (password.length < 3 || username.length < 3)
    res.status(400).json({
      error: "username or password must be at least 3 characters long",
    })

  try {
    const usernameExists = await User.findOne({ username })
    if (usernameExists)
      return res.status(400).json({
        error: "username must be unique",
      })

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      username,
      passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    return next(error)
  }
})

module.exports = usersRouter
