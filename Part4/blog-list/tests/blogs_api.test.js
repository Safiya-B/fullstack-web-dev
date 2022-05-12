const mongoose = require("mongoose")
const Blog = require("../models/blog")
const User = require("../models/user")
const supertest = require("supertest")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = supertest(app)

describe("blog posts tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
  })
  describe("fetching blog posts", () => {
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
  })

  describe("Saving blog posts correctly", () => {
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
  })

  describe("removing blog posts", () => {
    test("remove one post", async () => {
      const posts = await helper.blogsInDb()
      const postId = posts[0].id
      await api.delete(`/api/blogs/${postId}`).expect(204)

      const postsAfterDelete = await helper.blogsInDb()

      expect(postsAfterDelete).toHaveLength(helper.blogs.length - 1)
    })
  })

  describe("updating blog post", () => {
    test("update one post", async () => {
      const posts = await helper.blogsInDb()
      const lastIndex = posts.length - 1
      const postId = posts[lastIndex].id
      const updatedPost = {
        likes: 200,
      }
      await api.put(`/api/blogs/${postId}`).send(updatedPost).expect(201)
      const postsAfterUpdate = await helper.blogsInDb()
      console.log(postsAfterUpdate[lastIndex])
      expect(postsAfterUpdate[lastIndex].likes).toEqual(200)
    })
  })
})

describe("users tests", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("testpsswd", 10)
    const user = new User({
      name: "test",
      username: "testUser",
      password: passwordHash,
    })
    await user.save()
  })

  test("adding a new user", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "maya",
      username: "may123",
      password: "azerty",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)

    expect(usernames).toContain(newUser.username)
  })

  describe("invalid user addition", () => {
    test("username must be unique", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "maya",
        username: "testUser",
        password: "azerty",
      }
      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(res.body.error).toContain("username must be unique")
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("empty name", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        //name: "maya",
        username: "may123",
        password: "azerty",
      }
      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(res.body.error).toContain("username or password missing")
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("empty username", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "maya",
        //username: "may123",
        password: "azerty",
      }
      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(res.body.error).toContain("username or password missing")
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test("username length is less than 3", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "maya",
        username: "ma",
        password: "azerty",
      }
      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(res.body.error).toContain(
        "username or password must be at least 3 characters long"
      )
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test("password length is less than 3", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "maya",
        username: "may123",
        password: "az",
      }
      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(res.body.error).toContain(
        "username or password must be at least 3 characters long"
      )
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
