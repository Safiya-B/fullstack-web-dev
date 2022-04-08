var _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  else if (blogs.length === 1) return blogs[0].likes
  else {
    const sum = blogs.reduce((acc, current) => acc + current.likes, 0)
    return sum
  }
}

const favoriteBlog = (blogs) => {
  const numOfLikes = blogs.map((blog) => blog.likes)

  const max = Math.max(...numOfLikes)

  const maxLikesPost = numOfLikes.indexOf(max)
  const { title, author, likes } = blogs[maxLikesPost]
  return {
    title,
    author,
    likes,
  }
}

const mostBlogs = (blogs) => {
  const countObj = _.countBy(blogs, "author")

  const newObj = _.map(countObj, (value, key) => {
    return {
      author: key,
      blogs: value,
    }
  })

  const maxBlogs = _.maxBy(newObj, "blogs")

  return maxBlogs
}

const mostLikes = (blogs) => {
  const maxLikes = _.pick(_.maxBy(blogs, "likes"), ["author", "likes"])
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
