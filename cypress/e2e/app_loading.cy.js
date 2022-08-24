describe('simple loading', () => {
  it('loads the app', () => {
    cy.visit('/');
    cy.get('#scrollContainer');
  });
});
