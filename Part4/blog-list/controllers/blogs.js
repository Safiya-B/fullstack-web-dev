const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })
    response.json({ blogs })
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.post("/", async (request, response) => {
  // find number of users in db
  const usersLength = await User.count()
  const random = Math.floor(Math.random() * usersLength)

  //find a random user
  const user = await User.findOne().skip(random)

  const { title, author, url, likes } = request.body
  try {
    if (!url || !title) return response.status(400).send("missing url or title")
    if (!user) return response.status(400).send("no user to assign")
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    })
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)

    await user.save()
    response.status(201).json(result)
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedPost = {
    likes: request.body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedPost
    )
    response.status(201).json(updatedBlog)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = blogsRouter
