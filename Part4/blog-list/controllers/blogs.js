const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const { tokenExtractor, userExtractor } = require("../middlewares/middleware")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })
    response.json(blogs)
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const user = request.user
    const { title, author, url, likes } = request.body
    try {
      if (!url || !title)
        return response.status(400).send("missing url or title")

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
  }
)

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    try {
      const blogToRemove = await Blog.findById(request.params.id)
      if (!blogToRemove) return response.status(400).send("blog not found")

      const user = request.user

      if (user.id.toString() === blogToRemove.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)

        user.blogs = user.blogs.filter(
          (blog) => blog.toString() !== blogToRemove._id.toString()
        )
        await user.save()
        return response
          .status(204)
          .json({ message: "blog removed successfully" })
      } else {
        return response.status(401).send("unauthorized")
      }
    } catch (error) {
      logger.error(error)
    }
  }
)

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
