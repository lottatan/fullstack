const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('blog api tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
      })
    
    test('blog are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(2)
    })
    
    test('blogs have an id', async () => {
        const response = await api.get('/api/blogs')
    
        response.body.forEach(blog => {
            expect(blog).toBeDefined()})
    })
})

describe('addition and deleting works', () => {
    test('add blog works and amount increases', async () => {
        const newBlog = {
            title: "me, myself & I",
            author: "mä",
            url: "www.meitsi.fi",
            likes: 8
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })

    test('deleting a specific blog works', async () => {
        const start = await api.get('/api/blogs')
        const startLength = start.body.length
        const blog = start.body[0]
    
        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(204)
    
        const end = await api.get('/api/blogs')
        expect(end.body.length).toBe(startLength - 1)
    })
})

describe('missing items tests', () => {
    test('title is missing', async () => {
        const newBlog = {
            author: "moi",
            url: "www.hihi.com",
            likes: 6
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    
    test('url is missing', async () => {
        const newBlog = {
            title: "no url",
            author: "url",
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('likes are missing', async () => {
        const newBlog = {
            title: "no likes",
            author: "zero",
            url: "www.nolikes.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toBe(0)
    })

    test('updating likes works', async () => {
        const start = await api.get('/api/blogs')
        let blog = start.body[0]
        blog.likes += 1
    
        await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(200)
        
        const updated = await api.get('/api/blogs')
        const updatedBlog = updated.body.find(b => b.id === blog.id)
    
        
        expect(updatedBlog.likes).toBe(blog.likes)
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'moi',
        name: 'Moi Queens',
        password: 'salasana',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})

afterAll(async () => {
    await mongoose.connection.close()
})
