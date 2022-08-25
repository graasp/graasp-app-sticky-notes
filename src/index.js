/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { mockApi } from '@graasp/apps-query-client';
import Root from './components/Root';
import './index.css';
import { MOCK_API } from './config/settings';
import {
  SENTRY_DSN,
  SENTRY_TRACE_SAMPLE_RATE,
  SENTRY_ENVIRONMENT,
} from './config/sentry';

if (MOCK_API) {
  mockApi();
} else {
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
