import React, { Component, PropTypes } from 'react';
import { TableRow, TableHeaderColumn } from 'material-ui';

export default class TableHeadersList extends Component {
  static propTypes = {
    headers: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { headers } = this.props;

    return (
      <TableRow>
        {
          headers.map((header, index) => {
            return (
              <TableHeaderColumn key={index}>
                {header}
              </TableHeaderColumn>
            );
          })
        }
      </TableRow>
    );
  }
}
