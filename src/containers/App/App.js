import React, { Component, PropTypes } from 'react';
import { AppBar, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import './App.css';

export default class App extends Component {
  _handleAppMenu() {
    this.refs.leftNav.toggle();
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <AppBar title="Projet Couches !" />
        <ul className="layout horizontal around-justified">
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
