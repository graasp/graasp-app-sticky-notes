import {
  SETTINGS_BUTTON_CY,
  SETTINGS_CY,
  SCROLL_CONTAINER_CY,
  dataCyWrapper,
  BACKGROUND_IMAGE_CY,
} from '../../src/config/selectors';
import { APP_SETTINGS } from '../../src/constants/constants';

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

describe('Background image', () => {
  it('test the absence of background image', () => {
    let appSettings;
    cy.fixture('appSettings_withBckImg').then((aS) => {
      cy.setUpApi({
        appContext: {
          permission: 'admin',
          context: 'builder',
        },
        database: {
          appSettings: aS,
        },
      });
      appSettings = aS;
    });
    cy.visit('/');

    // TODO: check this.
    if (
      appSettings?.find(({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS)
        ?.data?.toggle &&
      appSettings?.find(({ name }) => name === APP_SETTINGS.BACKGROUND)
    ) {
      cy.get(dataCyWrapper(BACKGROUND_IMAGE_CY)).should('be.visible');
    } else {
      cy.get(dataCyWrapper(BACKGROUND_IMAGE_CY)).should('not.exist');
    }
  });
});
