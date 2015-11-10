import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import NotFound from './containers/NotFoundPage';
import SaisiePage from './containers/SaisiePage';

export default (
  <Route path="/" component={App}>
    <Route path="/saisie" component={SaisiePage} />
    <Route path="*" component={NotFound} />
  </Route>
);
