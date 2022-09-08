import {
  SETTINGS_BUTTON_CY,
  SETTINGS_CY,
  SCROLL_CONTAINER_CY,
  dataCyWrapper,
} from '../../src/config/selectors';

describe('Tests the basic features.', () => {
  it('loads the app', () => {
    cy.visit('/');
    cy.get(dataCyWrapper(SCROLL_CONTAINER_CY)).should('be.visible');
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
    cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).click();
    cy.get(dataCyWrapper(SETTINGS_CY)).should('be.visible');
  });
});
