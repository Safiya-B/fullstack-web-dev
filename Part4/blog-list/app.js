const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const app = express()

logger.info("connecting to", config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err.message)
  })

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app
