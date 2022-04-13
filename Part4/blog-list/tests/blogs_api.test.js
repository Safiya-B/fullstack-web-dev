const mongoose = require("mongoose")
const Blog = require("../models/blog")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  helper.blogs.forEach(async (blog) => {
    const post = new Blog(blog)
    await post.save()
  })
})

test("blog posts are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are 3 blog posts", async () => {
  const res = await api.get("/api/blogs")

  expect(res.body).toHaveLength(3)
})

test("unique identifier is named id", async () => {
  const res = await api.get("/api/blogs")

  res.body.forEach((post) => expect(post.id).toBeDefined())
})

test("new blog post is saved successfully", async () => {
  const newPost = {
    title: "James Clear",
    author: "James Clear",
    url: "https://jamesclear.com/",
    likes: 5000000,
  }
  await api.post("/api/blogs").send(newPost).expect(201)

  const newBlogsObj = await helper.blogsInDb()

  expect(newBlogsObj).toHaveLength(helper.blogs.length + 1)

  expect(newBlogsObj[newBlogsObj.length - 1]).toMatchObject(newPost)
})

test("missing likes property", async () => {
  const newPost = {
    title: "James Clear",
    author: "James Clear",
    url: "https://jamesclear.com/",
  }
  await api.post("/api/blogs").send(newPost).expect(201)

  const newBlogsObj = await helper.blogsInDb()

  expect(newBlogsObj[newBlogsObj.length - 1].likes).toEqual(0)
})

test("missing title or url", async () => {
  const newPost = {
    author: "James Clear",
    likes: "10000",
  }
  await api.post("/api/blogs").send(newPost).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
