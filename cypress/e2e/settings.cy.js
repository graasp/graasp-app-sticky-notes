describe('settings', () => {
    it('opens the settings', () => {
      cy.visit('/')
      cy.get('.ReactQueryDevtools > button').click()
      cy.get('#settings-button').click()
      cy.get('#settings')
    })
  })