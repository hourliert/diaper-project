import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Styles } from 'material-ui';
import theme from '../../themes';

import App from '../../components/App';

function mapStateToProps(state) {
  return {
    apiStatus: state.apiStatus,
  };
}

@connect(mapStateToProps)
@Styles.ThemeDecorator(Styles.ThemeManager.getMuiTheme(theme)) // eslint-disable-line new-cap
export default class AppPage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    apiStatus: PropTypes.object.isRequired,
  }

  render() {
    const { children, apiStatus } = this.props;

    return (
      <App
        apiStatus={apiStatus}>
        {children}
      </App>
    );
  }
}
