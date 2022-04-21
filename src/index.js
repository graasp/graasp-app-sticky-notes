/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { mockServer, buildMockLocalContext } from '@graasp/apps-query-client';
import Root from './components/Root';
import './index.css';
import buildDatabase, { mockContext } from './data/db';
import { MOCK_API } from './config/settings';

Sentry.init({
  dsn: 'https://6558f0f2adb64d6593db72a3905cfe49@o244065.ingest.sentry.io/6353030',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (MOCK_API) {
  const appContext = buildMockLocalContext(window.appContext ?? mockContext);
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.get('itemId')) {
    searchParams.set('itemId', appContext.itemId);
    window.location.search = searchParams.toString();
  }
  const database = window.Cypress ? window.database : buildDatabase(appContext);
  const errors = window.apiErrors;
  mockServer({ database, appContext, errors });
}

const root = document.getElementById('root');

const renderApp = (RootComponent) => {
  render(<RootComponent />, root);
};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot);
  });
}
