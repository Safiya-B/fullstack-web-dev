const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.post("/", async (request, response) => {
  const { url, title } = request.body
  try {
    if (!url || !title) return response.status(400).send("missing url or title")
    const blog = new Blog(request.body)
    const result = await blog.save()
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
