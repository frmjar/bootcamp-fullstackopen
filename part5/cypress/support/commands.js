Cypress.Commands.add('addUser', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username,
    password
  })
})

Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="username"]').type('elemao')
  cy.get('input[name="password"]').type('yolo')
  cy.get('input').contains('Login').click()
})

Cypress.Commands.add('newBlog', ({ title, author, url }) => {
  cy.get('button').contains('Create new blog').click()

  cy.get('input[name="title"]').type(title)
  cy.get('input[name="author"]').type(author)
  cy.get('input[name="url"]').type(url)

  cy.get('button').contains('Create').click()
})
