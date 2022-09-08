import { before } from "lodash";

describe('Tests the basic features.', () => {
  it('loads the app', () => {
    cy.visit('/');
    cy.get('#scrollContainer');
  });
});

describe('Settings', () => {
  it('opens the settings', () => {
    cy.setUpApi({
      appContext: {
        permission: 'admin',
        context: 'builder',
      },
    });
    cy.visit('/');
    // cy.get('.ReactQueryDevtools > button').click();
    cy.get('#settings-button').click();
    cy.get('#settings');
  });

});
