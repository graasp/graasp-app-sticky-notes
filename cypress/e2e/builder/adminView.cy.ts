import {
  NOTE_CONTAINER_CY,
  NOTE_EDIT_DIALOG,
  RELOAD_BUTTON_CY,
  SCROLL_CONTAINER_CY,
  SETTINGS_BUTTON_CY,
  SETTINGS_CY,
  dataCyWrapper,
} from '../../../src/config/selectors';

describe('Builder view with admin rights', () => {
  beforeEach(() => {
    cy.setUpApi({
      appContext: {
        permission: 'admin',
        context: 'builder',
      },
    });
    cy.visit('/');
  });
  it('open the app and check the UI', () => {
    cy.get(dataCyWrapper(SCROLL_CONTAINER_CY)).should('be.visible');
    cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).should('be.visible');
    cy.get(dataCyWrapper(RELOAD_BUTTON_CY)).should('be.visible');
  });
  describe('Settings', () => {
    it('opens the settings', () => {
      cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).click();
      cy.get(dataCyWrapper(SETTINGS_CY)).should('be.visible');
    });
  });
  describe('Notes', () => {
    it('add a note', () => {
      cy.get(dataCyWrapper(SCROLL_CONTAINER_CY)).scrollTo(0, 0);
      cy.get(dataCyWrapper(NOTE_CONTAINER_CY)).dblclick(10, 10);
      cy.get(dataCyWrapper(NOTE_EDIT_DIALOG)).should('be.visible');
    });
  });
});
