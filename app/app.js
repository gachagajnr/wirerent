/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import React from 'react';
import 'antd/dist/antd.css';

import '@babel/polyfill';
// import 'antd/dist/antd.less';
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

// Import root app
import App from 'containers/App';
import { ConnectedRouter } from 'connected-react-router';
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import { Provider } from 'react-redux';
// Import all the third party stuff
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import history from 'utils/history';
// Import i18n messages
import { translationMessages } from './i18n';
/* eslint-disable import/no-unresolved, import/extensions */


// Load the favicon and the .htaccess file


/* eslint-enable import/no-unresolved, import/extensions */



// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
