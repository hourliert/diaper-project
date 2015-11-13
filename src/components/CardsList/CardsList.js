import React, { Component, Children, cloneElement, PropTypes } from 'react';
import Radium from 'radium';

import styles from './styles';

@Radium
export default class CardsList extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layout vertical">
        {
          Children.map(this.props.children, (card, index) => {
            return (
              <div
                style={[styles.padded]}
                key={index}>
                {
                  cloneElement(card, {
                    style: {
                      ...styles.padded,
                      ...styles.muiCardHack,
                    },
                  })
              }
              </div>
            );
          })
        }
      </div>
    );
  }
}
