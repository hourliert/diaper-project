import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn, RaisedButton } from 'material-ui';

export default class PatientsTableRow extends Component {
  static propTypes = {
    striped: PropTypes.any,
    patient: PropTypes.object.isRequired,
    diaperTypes: PropTypes.array.isRequired,
    onEditRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { striped, patient, diaperTypes, onEditRow, onDeleteRow } = this.props;

    return (
      <TableRow striped={striped}>
        <TableRowColumn>{patient.firstName}</TableRowColumn>
        <TableRowColumn>{patient.lastName}</TableRowColumn>
        <TableRowColumn>
          <ul>
            {
              patient.diapers.map((diaper, indexDiaper) => {
                return (
                  <li key={indexDiaper}>
                    {
                      diaperTypes.filter((diaperType) => {
                        return diaperType.id === diaper.type;
                      })[0].value
                    }
                  </li>
                );
              })
            }
          </ul>
        </TableRowColumn>
        <TableRowColumn>
          <ul>
            {
              patient.diapers.map((diaper, indexDiaper) => {
                return (
                  <li key={indexDiaper}>{diaper.amount}</li>
                );
              })
            }
          </ul>
        </TableRowColumn>
        <TableRowColumn>
          <div className="layout horizontal around-justified">
            <RaisedButton
              label="Editer"
              secondary
              onClick={onEditRow.bind(this, patient)}/>
            <RaisedButton
              label="Supprimer"
              primary
              onClick={onDeleteRow.bind(this, patient)}/>
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}
