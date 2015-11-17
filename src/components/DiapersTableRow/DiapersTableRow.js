import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui';

export default class DiapersTableRow extends Component {
  static propTypes = {
    striped: PropTypes.any,
    patient: PropTypes.object.isRequired,
    selectedDiaperIds: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _findDiaperForType(patient, id) {
    let res = 0;
    patient.diapers.forEach((diaper) => {
      if (diaper.type === parseInt(id, 10)) {
        res = diaper.amount;
      }
    });
    return res;
  }

  render() {
    const { striped, patient, selectedDiaperIds } = this.props;

    return (
      <TableRow striped={striped}>
        <TableRowColumn>
          {patient.firstName} {patient.lastName}
        </TableRowColumn>
        {
          selectedDiaperIds.map((id, dIndex) => {
            const diaperAmount = this._findDiaperForType(patient, id);

            return (
              <TableRowColumn
                key={'body-cell-' + dIndex}>
                {diaperAmount > 0 ? diaperAmount : ''}
              </TableRowColumn>
            );
          })
        }
      </TableRow>
    );
  }
}
