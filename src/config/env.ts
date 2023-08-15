const {
  VITE_GRAASP_APP_KEY,
  VITE_VERSION,
  VITE_SENTRY_ENV,
  VITE_SENTRY_DSN,
  VITE_MOCK_API,
  VITE_API_HOST,
  VITE_REFETCH_INTERVAL_SETTING,
  VITE_WS_HOST,
} = window.Cypress ? Cypress.env() : import.meta.env;

export const MOCK_API = VITE_MOCK_API === 'true';
export const API_HOST = VITE_API_HOST;
export const VERSION = VITE_VERSION || 'latest';
export const GRAASP_APP_KEY = VITE_GRAASP_APP_KEY;
export const SENTRY_ENV = VITE_SENTRY_ENV;
export const SENTRY_DSN = VITE_SENTRY_DSN;
export const REFETCH_INTERVAL_SETTING = VITE_REFETCH_INTERVAL_SETTING;
export const WS_HOST: string | undefined = VITE_WS_HOST;
