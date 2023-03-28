describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Example Person',
      username: 'ExamplePerson',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log into application')
    cy.contains('login')
    cy.get('form').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('ExamplePerson')
      cy.get('#Password').type('secret')
      cy.get('#login').click()
      cy.contains('Example Person logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('ExamplePerson')
      cy.get('#Password').type('wrong password')
      cy.get('#login').click()
      cy.contains('wrong username or password')
        .and('have.css', 'color', 'rgb(178, 34, 34)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'ExamplePerson', password: 'secret' })
        .then(response => {
          localStorage.setItem('bloglistUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('.blog-title').type('Example blog')
      cy.get('.blog-author').type('Example Author')
      cy.get('.blog-url').type('notarealblog.com')
      cy.contains('create').click()
      cy.contains('Example blog')
    })

    describe('Blog operations', function() {
      beforeEach(function() {
        cy.contains('add new blog').click()
        cy.get('.blog-title').type('Example blog')
        cy.get('.blog-author').type('Example Author')
        cy.get('.blog-url').type('notarealblog.com')
        cy.contains('create').click()
        cy.contains('view').click()
      })

      it('A blog can be liked', function() {
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })

      it('A blog can be deleted', function() {
        cy.contains('Delete').click()
        cy.contains('Deleted Example blog')
      })

      describe('Blogs created by other users', function() {
        beforeEach(function() {
          cy.contains('logout').click()
          const user = {
            name: 'Example Person 2',
            username: 'ExamplePerson2',
            password: 'secret'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.request('POST', 'http://localhost:3003/api/login', { username: 'ExamplePerson2', password: 'secret' })
            .then(response => {
              localStorage.setItem('bloglistUser', JSON.stringify(response.body))
              cy.visit('http://localhost:3000')
            })
        })

        it('A blog cannot be deleted by another user', function() {
          cy.contains('view').click()
          cy.get('#deleteButton').should('not.exist')
        })
      })

      it.only('Blogs are displayed in the order of most likes', function() {
        cy.contains('add new blog').click()
        cy.get('.blog-title').type('Second blog')
        cy.get('.blog-author').type('Example Author')
        cy.get('.blog-url').type('notarealblogeither.com')
        cy.contains('create').click()
        cy.get('.blogContent').eq(0).should('contain', 'Example blog Example Author')
        cy.get('.blogContent').eq(1)
          .contains('view').click()
          .parent().contains('like').click()
        cy.get('.blogContent').eq(0).should('contain', 'Second blog Example Author')
      })
    })


  })

})