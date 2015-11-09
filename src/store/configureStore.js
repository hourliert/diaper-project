import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

import routes from '../routes';
import rootReducer from '../reducers';

/**
 * Configure and create the application store.
 * @param  {Object} initialState     Could be anything depending on your store model.
 * @param  {ReduxRouter} reduxReactRouter Redux router. Different between server and client
 * @param  {history} createHistory    History for the router. Different between server and client
 * @return {Object}                  The redux store
 */
export default function configureStore(initialState, reduxReactRouter, createHistory) {
  let finalCreateStore;

  // If we are on the server (ie. during the server rendering), we don't
  // include the devtool middleware.
  if (global.server) {
    finalCreateStore = compose(
      reduxReactRouter({ routes, createHistory }),
      applyMiddleware(thunk)
    )(createStore);
  } else {
    finalCreateStore = compose(
      reduxReactRouter({ routes, createHistory }),
      applyMiddleware(thunk, createLogger()),
      devTools()
    )(createStore);
  }

  // Create the store using the reducers defined in `../reducers/counter.js`
  const store = finalCreateStore(rootReducer, initialState);

  // If we are on client and the webpackHotMiddleware is loaded in the client,
  // we allow reducers replacement.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
