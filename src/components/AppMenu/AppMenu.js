import React, { Component, PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router';
import Radium from 'radium';

import styles from './styles';

@Radium
export default class AppMenu extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
  }

  render() {
    const { links } = this.props;

    return (
      <ul
        className="layout horizontal around-justified"
        style={[styles.base]}>
        {
          links.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.to}>
                  <FlatButton label={link.label} />
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
