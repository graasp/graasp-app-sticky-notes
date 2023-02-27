import { Context } from '@graasp/sdk';

import {
  CANCEL_DELETE_BUTTON_CY,
  CONFIRM_DELETE_BUTTON_CY,
  CONFIRM_DELETE_DIALOG_CY,
  DELETE_BUTTON_IN_DIALOG_CY,
  NOTE_CONTAINER_CY,
  NOTE_CONTENT_CY,
  NOTE_CY,
  NOTE_EDIT_DIALOG,
  SAVE_DIALOG_CY,
  dataCyWrapper,
} from '../../../src/config/selectors';
import { NOTES_TOP_LEFT } from '../../fixtures/appData';

describe('Notes and interactions', () => {
  [Context.BUILDER, Context.PLAYER].forEach((context) => {
    describe(`In ${context} view`, () => {
      beforeEach(() => {
        cy.setUpApi({
          database: {
            appData: NOTES_TOP_LEFT,
          },
          appContext: {
            permission: 'admin',
            context,
          },
        });
        cy.visit('/');
      });

      it('add a note', () => {
        cy.get(dataCyWrapper(NOTE_CONTAINER_CY)).dblclick('center');
        cy.get(dataCyWrapper(NOTE_EDIT_DIALOG)).should('be.visible');
      });
      it('checks for existing notes', () => {
        NOTES_TOP_LEFT.forEach(({ id }) => {
          cy.get(dataCyWrapper(`${NOTE_CY}-${id}`)).should('be.visible');
        });
      });
      it('deletes one note', () => {
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`))
          .should('be.visible')
          .dblclick();
        cy.get(dataCyWrapper(DELETE_BUTTON_IN_DIALOG_CY)).click();
        cy.get(dataCyWrapper(CONFIRM_DELETE_DIALOG_CY)).within(() => {
          cy.get(dataCyWrapper(CONFIRM_DELETE_BUTTON_CY)).click();
        });
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`)).should(
          'not.exist',
        );
      });
      it('cancels note deletion', () => {
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`))
          .should('be.visible')
          .dblclick();
        // cy.wait(1000);
        cy.get(dataCyWrapper(DELETE_BUTTON_IN_DIALOG_CY)).click();
        cy.get(dataCyWrapper(CONFIRM_DELETE_DIALOG_CY)).within(() => {
          cy.get(dataCyWrapper(CANCEL_DELETE_BUTTON_CY)).click();
        });
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`)).should(
          'exist',
        ); // TODO: improve - close dialog and check for note visibility
      });
      it('edits one note', () => {
        const typedContent = 'Hello world';
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`))
          .should('be.visible')
          .dblclick();
        cy.get(dataCyWrapper(NOTE_EDIT_DIALOG)).within(() => {
          cy.get('#quill-dialog').within(() => {
            cy.get('.ql-editor').clear().type(typedContent);
          });
          cy.get(dataCyWrapper(SAVE_DIALOG_CY)).click();
        });
        cy.get(dataCyWrapper(`${NOTE_CY}-${NOTES_TOP_LEFT[0].id}`)).within(
          () => {
            cy.get(dataCyWrapper(NOTE_CONTENT_CY)).should(
              'contain',
              typedContent,
            );
          },
        );
      });
    });
  });
});
