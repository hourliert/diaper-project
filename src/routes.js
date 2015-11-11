import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFound from './containers/NotFoundPage';
import SaisiePage from './containers/SaisiePage';
import ExportPage from './containers/ExportPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SaisiePage} />
    <Route path="/saisie" component={SaisiePage} />
    <Route path="/export" component={ExportPage} />
    <Route path="*" component={NotFound} />
  </Route>
);
