/**
 * If server rendering is disabled. It starts here.
 * Else, you should have see in `./server.js` how the server side works.
 * Thanks to react and his capability to merge efficiently the rendered app on
 * an existing markup, everything works the same if we enable or not
 * server rendering.
 */
import 'babel-core/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter, reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from './store';

import { REDUX_DEVTOOLS } from './config';

// First we need to retrieve the state of the application and create the store
// If the server has rendered the app, `window.__INITIAL_STATE__` has been set
// to the initial state.
// Else, the initial state is empty.
// We could also ask a WebAPI or whatever to retrieve the state.
// Let's check the `configureStore` function in `./store/configureStore.js`.
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, reduxReactRouter, createHistory);
const rootElement = document.getElementById('root');

// Then, let react do the magic! Render the app!
// Don't hesitate to look at `./routes.js` to see which component are rendered
// depending on the current route.
render(
  <Provider store={store} key="provider">
    <ReduxRouter />
  </Provider>,
  rootElement
);

// If redux-devtools is enabled, we rerender the app with the redux-devtools
// pannel.
// In fact, we don't merge this render operation with the previous one because
// react would raise a warning meaning the client code differs from the server
// code.
// It is preferable to let react to render a second time as it would
// keep the already renderer application and only add the devtool panel.
if (REDUX_DEVTOOLS) {
  render(
    <div>
      <Provider store={store} key="provider">
        <ReduxRouter />
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>,
    rootElement
  );
}
