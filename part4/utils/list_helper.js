const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite,
  )
}

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  return Object.entries(authorCounts).reduce(
    (max, [author, count]) =>
      count > max.blogs ? { author, blogs: count } : max,
    { author: null, blogs: 0 },
  )
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
