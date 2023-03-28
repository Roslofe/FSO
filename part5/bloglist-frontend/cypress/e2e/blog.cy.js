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
    this.beforeEach(function() {
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
  })
  
})