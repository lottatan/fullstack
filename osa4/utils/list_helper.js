const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const likes = blogs.reduce((total, blog) => {
        return total + blog.likes
    }, 0)

    return likes
}

const maxLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        let maxLikes = -1
        let favorite = {}

        blogs.forEach((blog) => {
            if (blog.likes > maxLikes) {
                maxLikes = blog.likes
                favorite = blog
            }})
        return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }

}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authorCounts = lodash.countBy(blogs, 'author')
        const mostBlogsAuthor = lodash.maxBy(lodash.keys(authorCounts), author => authorCounts[author])
        return {
            author: mostBlogsAuthor,
            blogs: authorCounts[mostBlogsAuthor]
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authorCounts = lodash.groupBy(blogs, 'author')
        const authorLikes = lodash.mapValues(authorCounts, blogs => blogs.reduce((total, blog) => total + blog.likes, 0))
        const authorWithMostLikes = lodash.maxBy(lodash.keys(authorLikes), author => authorLikes[author])

        return {
            author: authorWithMostLikes,
            likes: authorLikes[authorWithMostLikes]
        }
    }
}
  

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    mostBlogs,
    mostLikes
}
