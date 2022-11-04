/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { mockApi } from '@graasp/apps-query-client';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import Root from './components/Root';
import {
  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
  SENTRY_TRACE_SAMPLE_RATE,
} from './config/sentry';
import { MOCK_API } from './config/settings';
import './index.css';

if (MOCK_API) {
  mockApi({
    appContext: window.Cypress ? window.appContext : undefined,
    database: window.Cypress ? window.database : undefined,
  });
} else if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],
    environment: SENTRY_ENVIRONMENT,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE,
  });
}

const root = createRoot(document.getElementById('root'));

const renderApp = (RootComponent) => {
  root.render(<RootComponent />);
};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot);
  });
}
