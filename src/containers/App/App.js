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
            <Link to="/saisie">
              <RaisedButton label="Saisie" />
            </Link>
          </li>
          <li>
            <Link to="/export">
              <RaisedButton label="Export" />
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
