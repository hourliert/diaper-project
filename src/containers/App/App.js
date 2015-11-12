import React, { Component, PropTypes } from 'react';
import { AppBar, RaisedButton, Styles } from 'material-ui';
import { Link } from 'react-router';
import theme from '../../themes';

@Styles.ThemeDecorator(Styles.ThemeManager.getMuiTheme(theme)) // eslint-disable-line new-cap
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
