import React, { Component, PropTypes } from 'react';
import { AppBar, Snackbar, CircularProgress } from 'material-ui';

import AppMenu from '../AppMenu';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    apiStatus: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { apiStatus: { error } } = nextProps;

    if (error && error.length) {
      this.refs.snackbar.show();
    }
  }

  render() {
    const { children, apiStatus: { isLoading, error } } = this.props;

    return (
      <div>
        <AppBar title="Projet Couche"/>
        <div className="layout horizontal">
          <AppMenu
            links={
              [
                {
                  to: '/saisie',
                  label: 'Saisie',
                },
                {
                  to: '/export',
                  label: 'Export',
                },
              ]
            }/>
          <CircularProgress
            size={0.75}
            mode={isLoading ? 'indeterminate' : 'determinate'}/>
        </div>
        {/* This is for react-router */}
        {children}
        <Snackbar
          ref="snackbar"
          message={error || ''}/>
      </div>
    );
  }
}
