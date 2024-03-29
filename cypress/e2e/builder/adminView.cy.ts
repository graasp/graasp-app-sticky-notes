import { PermissionLevel } from '@graasp/sdk';

import {
  BACKDROP_INSTRUCTIONS_CY,
  NOTE_CONTAINER_CY,
  NOTE_EDIT_DIALOG,
  RELOAD_BUTTON_CY,
  SETTINGS_BUTTON_CY,
  SETTINGS_CY,
  dataCyWrapper,
} from '../../../src/config/selectors';

describe('Builder view with admin rights', () => {
  beforeEach(() => {
    cy.setUpApi({
      appContext: {
        permission: PermissionLevel.Admin,
        context: 'builder',
      },
    });
    cy.visit('/');
  });
  it('open the app and check the UI', () => {
    cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).should('be.visible');
    cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).click('center');
    cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).should('be.visible');
    cy.get(dataCyWrapper(RELOAD_BUTTON_CY)).should('be.visible');
  });
  describe('Close backdrop', () => {
    it('closes the backdrop with the instructions', () => {
      cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).click('center');
      cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).should('not.be.visible');
    });
  });
  describe('Settings', () => {
    it('opens the settings', () => {
      cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).click('center');
      cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).click();
      cy.get(dataCyWrapper(SETTINGS_CY)).should('be.visible');
    });
  });
  describe('Notes', () => {
    it('add a note', () => {
      cy.get(dataCyWrapper(BACKDROP_INSTRUCTIONS_CY)).click('center');
      cy.get(dataCyWrapper(NOTE_CONTAINER_CY)).dblclick('center');
      cy.get(dataCyWrapper(NOTE_EDIT_DIALOG)).should('be.visible');
    });
  });
});
