import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import Root from './components/Root';
// import configureStore from './store/configureStore';
import './index.css';

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
