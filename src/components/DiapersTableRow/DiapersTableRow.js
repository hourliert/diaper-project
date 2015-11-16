import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui';

export default class DiapersTableRow extends Component {
  static propTypes = {
    striped: PropTypes.any,
    patient: PropTypes.object.isRequired,
    diapersTypes: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _findDiaperForType(patient, diaperType) {
    let res = 0;
    patient.diapers.forEach((diaper) => {
      if (diaper.type === diaperType) {
        res = diaper.amount;
      }
    });
    console.log(res);
    return res;
  }

  render() {
    const { striped, patient, diapersTypes } = this.props;

    return (
      <TableRow striped={striped}>
        <TableRowColumn>
          {patient.firstName} {patient.lastName}
        </TableRowColumn>
        {
          diapersTypes.map((diaperType, dIndex) => {
            console.log(diaperType);
            const diaperAmount = this._findDiaperForType(patient, diaperType);

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
