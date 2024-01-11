const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const emptyList = []

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

const listWithTwoBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
]

const listWithSameLikes = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
]

const listWithManyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }  
]


describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(12)
    })

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
  })

describe('favorite blog', () => {
    test('when the list is empty', () => {
        const result = listHelper.maxLikes(emptyList)
        expect(result).toEqual(null)
    })

    test('when the list has one blog', () => {
        const result = listHelper.maxLikes(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is right', () => {
        const result = listHelper.maxLikes(listWithTwoBlogs)
        expect(result).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        })
    })

    test('when two has the same value', () => {
        const result = listHelper.maxLikes(listWithSameLikes)
        const expectedBlogs = [
            {
                title: 'React patterns',
                author: 'Michael Chan',
                likes: 5
            },
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        ]

        const resultIsExpected = expectedBlogs.some(blog => (
            blog.title === result.title && blog.author === result.author && blog.likes === result.likes))
    
        expect(resultIsExpected).toBe(true)
    })
})

describe('most blogs', () => {
    test('when the list is empty', () => {
        const result = listHelper.maxLikes(emptyList)
        expect(result).toEqual(null)
    })

    test('when the list has one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra', 
            blogs: 1
        })
    })

    test('when the list has two blogs', () => {
        const result = listHelper.mostBlogs(listWithTwoBlogs)
        const expectedBlogs = [
            {
                author: "Michael Chan",
                blogs: 1
            },
            {
                author: "Edsger W. Dijkstra",
                blogs: 1
            }
        ]
        const resultIsExpected = expectedBlogs.some(blog => (
            blog.author === result.author && blog.blogs === result.blogs))
        expect(resultIsExpected).toBe(true)
    })

    test('when the list has many blogs', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 2
        })
    })
})

describe('most likes', () => {
    test('when the list is empty', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toEqual(null)
    })

    test('when the list has one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when they have the same amount of likes', () => {
        const result = listHelper.mostLikes(listWithSameLikes)
        const expectedBlogs = [
            {
                author: "Michael Chan",
                likes: 5
            },
            {
                author: "Edsger W. Dijkstra",
                likes: 5
            }
        ]
        const resultIsExpected = expectedBlogs.some(blog => (
            blog.author === result.author && blog.blogs === result.blogs))
        expect(resultIsExpected).toBe(true)
    })

    test('when the list has many blogs', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})