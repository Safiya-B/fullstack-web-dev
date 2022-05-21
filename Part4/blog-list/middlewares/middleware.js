const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
    return response.status(401).json({ error: "token missing or invalid" })
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) return response.status(400).send("no user")
  request.user = user

  next()
}

module.exports = {
  tokenExtractor: tokenExtractor,
  userExtractor: userExtractor,
}
