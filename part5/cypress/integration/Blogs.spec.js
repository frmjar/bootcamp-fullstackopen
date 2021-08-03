describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'elemao',
      password: 'yolo'
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('input').contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('elemao')
      cy.get('input[name="password"]').type('yolo')
      cy.get('input').contains('Login').click()

      cy.get('.alert').contains('elemao successfully logged in')
      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('elmao')
      cy.get('input[name="password"]').type('yoo')
      cy.get('input').contains('Login').click()

      cy.get('.alert').contains('invalid username or password')
      cy.contains('Login to application')
    })
  })
})
