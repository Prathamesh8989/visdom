describe('Test Setup', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.get('body').should('be.visible')
  })

  it('server is online', () => {
    cy.contains('online', { timeout: 5000 }).should('be.visible')
  })

  it('manual server reconnect', () => {
    cy.contains('online', { timeout: 5000 }).should('be.visible')

    // Cycle 1
    cy.contains('online').click()
    cy.contains('offline').should('be.visible')
    cy.contains('offline').click()
    cy.contains('online').should('be.visible')

    // Cycle 2
    cy.contains('online').click()
    cy.contains('offline').should('be.visible')
    cy.contains('offline').click()
    cy.contains('online').should('be.visible')

    // Cycle 3
    cy.contains('online').click()
    cy.contains('offline').should('be.visible')
    cy.contains('offline').click()
    cy.contains('online').should('be.visible')
  })

  it('tree selection opens & shows main', () => {
    cy.get('.rc-tree-select').should('be.visible').click()
    cy.get('.rc-tree-select-tree')
      .contains('main')
      .should('be.visible')
  })

  it('env selection works', () => {
    // Ensure tree select is visible
    cy.get('.rc-tree-select', { timeout: 10000 })
      .should('be.visible')

    // Open dropdown using the working selector
    cy.get('.rc-tree-select')
      .click({ force: true })

    // Click "main" from tree
    cy.get('.rc-tree-select-tree')
      .contains('main')
      .click({ force: true })

    // Confirm "main" appears with specific DOM attribute
    // This ensures the actual selection element exists, not just floating text
    cy.get('.rc-tree-select [title="main"]')
      .should('be.visible')

    // Remove using clear button
    cy.get('.rc-tree-select-selection__clear')
      .click({ force: true })

    // Confirm it's cleared from the DOM entirely
    cy.get('.rc-tree-select [title="main"]')
      .should('not.exist')
  })
})