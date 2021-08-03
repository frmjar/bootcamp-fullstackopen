describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser('elemao', 'yolo')
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

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login('elemao', 'yolo')
      cy.newBlog({
        title: 'Nuevo blog de pruebas',
        author: 'Elemao',
        url: 'http://fasdfa'
      })
    })

    it('A blog can be created', function () {
      cy.wait(500)
      cy.get('button').contains('Create new blog').click()

      cy.get('input[name="title"]').type('Probando terrible test')
      cy.get('input[name="author"]').type('Ferremejar')
      cy.get('input[name="url"]').type('http://omg.com')

      cy.get('button').contains('Create').click()

      cy.get('.alert').contains('A new blog Probando terrible test by Ferremejar has been saved!')
    })

    it('Like blog', function () {
      cy.wait(500)
      cy.get('button').contains('show').click()
      cy.get('.likes').contains('0')
      cy.get('button').contains('Like').click()
      cy.get('.likes').contains('1')
    })

    it('Remove blog', function () {
      cy.wait(500)
      cy.get('button').contains('show').click()
      cy.get('button').contains('Remove').click()

      cy.get('.alert').contains('The blog Nuevo blog de pruebas by Elemao has been removed!')
    })
  })
})
