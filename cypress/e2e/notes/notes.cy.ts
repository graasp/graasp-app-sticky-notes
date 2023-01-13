import { Context } from '@graasp/sdk';

import {
  CONFIRM_DELETE_DIALOG_CY,
  NOTE_CONTAINER_CY,
  NOTE_CONTENT_CY,
  NOTE_CY,
  NOTE_EDIT_DIALOG,
  SCROLL_CONTAINER_CY,
  dataCyWrapper,
} from '../../../src/config/selectors';
import { NOTES_TOP_LEFT } from '../../fixtures/appData';

describe('Notes and interactions', () => {
  [Context.BUILDER, Context.PLAYER].forEach((context) => {
    describe(`In ${context} view`, () => {
      beforeEach(() => {
        cy.setUpApi({
          appData: NOTES_TOP_LEFT,
          appContext: {
            permission: 'admin',
            context,
          },
        });
        cy.visit('/');
        cy.get(dataCyWrapper(SCROLL_CONTAINER_CY)).scrollTo(0, 0);
      });

      it('add a note', () => {
        cy.get(dataCyWrapper(NOTE_CONTAINER_CY)).dblclick(5, 5);
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
        // cy.wait(1000);
        cy.get(`#delete-button-in-dialog`).click();
        cy.get(dataCyWrapper(CONFIRM_DELETE_DIALOG_CY)).within(() => {
          cy.get('#confirm-delete-button').click();
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
        cy.get(`#delete-button-in-dialog`).click();
        cy.get(dataCyWrapper(CONFIRM_DELETE_DIALOG_CY)).within(() => {
          cy.get('#cancel-delete-button').click();
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
          cy.get('#save-button-in-dialog').click();
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

// describe('Background image', () => {
//   it('has no background image', () => {
//     let appSettings;
//     cy.fixture('appSettings_withBckImg').then((aS) => {
//       cy.setUpApi({
//         appContext: {
//           permission: 'admin',
//           context: 'builder',
//         },
//         database: {
//           appSettings: aS,
//         },
//       });
//       appSettings = aS;
//     });
//     cy.visit('/');

//     // TODO: check this.
//     if (
//       appSettings?.find(({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS)
//         ?.data?.toggle &&
//       appSettings?.find(({ name }) => name === APP_SETTINGS.BACKGROUND)
//     ) {
//       cy.get(dataCyWrapper(BACKGROUND_IMAGE_CY)).should('be.visible');
//     } else {
//       cy.get(dataCyWrapper(BACKGROUND_IMAGE_CY)).should('not.exist');
//     }
//   });
// });
