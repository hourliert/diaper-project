/**
 * Everything begins here!
 * This file could seem heavy or scary, but wait!
 * First if you don't want to use server rendering, check `./config.js` to
 * enable/disable it. In this case, everything between line 12 and 82 is meaningless.
 * Line 89, we simply run a web server that serves the static website.
 * On the opposite, if server rendering is enabled. Check the middleware line 47.
 */

import 'babel-core/polyfill';
import path from 'path';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { reduxReactRouter, match } from 'redux-router/server';
import {ReduxRouter} from 'redux-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { fetchCounter } from './api';
import configureStore from './store';

import { SERVER_PORT, SERVER_RENDERING } from './config';

const app = global.server = new Express();
const port = SERVER_PORT;

/**
 * Render the "index.html"
 * @param  {string} html         The rendererd DOM. Or anything...
 * @param  {Object} initialState The initial redux app state.
 * @return {string}              "index.html"
 */
function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Seed</title>
      </head>
      <body>
        <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        <script src="/client/bundle.js"></script>
      </body>
    </html>
  `;
}

/**
 * Express middleware that handles the server rendering of the react app.
 */
async function handleRender(req, res, next) {
  try {
    // Our application displays a counter with a potential initial value.
    // How the server could know this initial value? Simple! By asking an API.
    // `fetchCounter` is a fake API described in `./api/counter.js`.
    // The first thing to do before rendering the app is to ask the API for
    // the initial counter value.
    let counter;
    try {
      counter = await fetchCounter();
    } catch (err) {
      console.log(`${err.message}: Initializing a new counter`); // eslint-disable-line no-console
    } finally {
      counter = counter || 0;
    }

    // The server must have a reference to the redux application store.
    // Let's create it. Notice that we pass to it `reduxReactRouter` and
    // `createMemoryHistory`. This is because these functions differ between
    // client and server.
    const initialState = { counter };
    const store = configureStore(initialState, reduxReactRouter, createMemoryHistory);

    // Finally, each time the store dispatch a new action. (Eg. routeDidChange)
    // from redux-router. We match the action with the req.originUrl and render
    // the corresponding component. If nothing match, or we get a redirect,
    // we do what needs to be done.
    store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
      if (error) {
        console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
        res.status(500).send(error);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (!routerState) {
        res.status(500).send('Missing routerState');
      } else {
        // We render the application server side.
        const html = renderToString(
          <Provider store={store} key="provider">
            <ReduxRouter {...routerState}/>
          </Provider>
        );
        const finalState = store.getState();

        // Finally we send the application markup to the client.
        // Let's go to `./client.js`!
        res.status(200).send(renderFullPage(html, finalState));
      }
    }));
  } catch (err) {
    next(err);
  }
}

app.set('port', (process.env.PORT || port));
app.use('/client', Express.static(path.join(__dirname, './client')));
if (SERVER_RENDERING) {
  app.use(handleRender);
} else {
  // Static serving of "index.html"
  app.use((req, res) => {
    res.status(200).send(renderFullPage('Loading without server rendering...'));
  });
}

app.listen(port, (error) => {
  if (error) {
    console.err(error); // eslint-disable-line no-console
  } else {
    console.log(`==> 🌎  The server is running on port ${port}.`); // eslint-disable-line no-console
  }
});
