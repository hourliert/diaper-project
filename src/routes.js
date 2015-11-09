import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AboutPage from './containers/AboutPage';
import CounterPage from './containers/CounterPage';
import NotFound from './containers/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterPage}/>
    <Route path="counter" component={CounterPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFound} />
  </Route>
);
