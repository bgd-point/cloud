// https://docs.cypress.io/api/introduction/api.html

describe('Export customer', () => {
  it('Login and check user can export customer', async () => {
    cy.visit('http://dev.localhost:8080')

    // Pertama kali menggunakan unit test vue, bingung bagus login tanpa/menggunakan ui, jadi saya buat 2 sekaligus
    // Login with ui
    // const username = 'admin'
    // const password = 'admin'
    // cy.get('input[name=username]').type(username)

    // cy.get('input[name=password]').type(`${password}{enter}`)
    
    // cy.get('#page-header-user-dropdown').should('have.text', ' ADMIN')
    
    // cy.visit('http://dev.localhost:8080/master/customer')

    // cy.wait(3000)

    // cy.get('a').should('have.class', 'button-export-customer').end()

    // Login with store dispatch vuex
    cy.window().should('have.property', 'store')

    await cy.window().then( async (win) => {
      await win.store.dispatch('auth/login', {
        username: 'admin',
        password: 'admin'
      })
    
      cy.wait(3000)

      cy.visit('http://dev.localhost:8080/master/customer')
    
      cy.get('a').should('have.class', 'button-export-customer').end()
    })
  })
})