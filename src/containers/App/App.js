import 'babel-core/polyfill';
import React, { Component, PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li>
            <Link to="/counter">
              <RaisedButton label="Counter" />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <RaisedButton label="About" />
            </Link>
          </li>
        </ul>
        {/* This is for react-router */}
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
