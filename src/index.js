import React from 'react';
import { render } from 'react-dom';
import { mockServer, buildMockLocalContext } from '@graasp/apps-query-client';
// import { Provider } from 'react-redux';
import Root from './components/Root';
// import configureStore from './store/configureStore';
import './index.css';
import buildDatabase from './data/db';
import { MOCK_API } from './config/settings';

console.log(MOCK_API);

if (MOCK_API) {
  const appContext = buildMockLocalContext(window.appContext);
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.get('itemId')) {
    searchParams.set('itemId', appContext.itemId);
    window.location.search = searchParams.toString();
  }
  // const database = window.Cypress ? window.database : buildDatabase(appContext);
  const database = buildDatabase(appContext);
  const errors = window.apiErrors;
  mockServer({ database, appContext, errors });
}

const root = document.getElementById('root');

const renderApp = RootComponent => {
  render(<RootComponent />, root);
};

// render app to the dom
// const { store, history } = configureStore();

// renderApp(Root, store, history);
renderApp(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    // renderApp(NextRoot, store, history);
    renderApp(NextRoot);
  });
}
