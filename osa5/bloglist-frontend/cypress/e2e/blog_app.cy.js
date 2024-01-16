describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'testaaja',
      username: 'testaaja1',
      password: 'testisalasana',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('user can login with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testaaja1')
      cy.get('#password').type('testisalasana')
      cy.get('#login-button').click()

      cy.contains('testaaja logged in')
    })

    it('user can login with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testaaja1')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja1', password: 'testisalasana' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('otsikko')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('www.eijaksa.fi')
      cy.contains('create').click()
      cy.contains('otsikko by kirjoittaja added')
    })

    beforeEach(function() {
      cy.createBlog({
        title: 'otsikko',
        author: 'kirjoittaja',
        url: 'www.eijaksa.fi',
      })
    })

    it('blog shows', function() {
      cy.contains('view').click()
    })

    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('a blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
    })
  })

  describe('delete button only shows to user that created blog post', function() {
    it('delete button doesnt show', function() {
      cy.request('POST', 'http://localhost:3003/api/users/', {
      name: 'testaaja2',
      username: 'testaaja2',
      password: 'testisalasana'
    })

    cy.login({ username: 'testaaja2', password: 'testisalasana' })

    cy.createBlog({
      title: 'otsikko',
      author: 'kirjoittaja',
      url: 'www.eijaksa.fi',
    })

    cy.contains('logout').click()
    cy.login({ username: 'testaaja1', password: 'testisalasana' })
    cy.contains('view').click()
    cy.get('delete-button').should('not.exist')
  })
})
})