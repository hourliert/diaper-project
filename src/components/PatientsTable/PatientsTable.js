import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, RaisedButton } from 'material-ui';

export default class PatientsTable extends Component {
  static propTypes = {
    patients: PropTypes.object.isRequired,

    onEditRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { patients, onEditRow, onDeleteRow } = this.props;

    const header = (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Prénom</TableHeaderColumn>
          <TableHeaderColumn>Nom</TableHeaderColumn>
          <TableHeaderColumn>Types de couches</TableHeaderColumn>
          <TableHeaderColumn>Quantités</TableHeaderColumn>
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
    );

    const bodyData = patients.map((patient, indexPatient) => {
      const diaperTypes = patient.diapers.map((diaper, indexDiaper) => {
        return (
          <li key={indexDiaper}>{diaper.type}</li>
        );
      });
      const diaperAmounts = patient.diapers.map((diaper, indexDiaper) => {
        return (
          <li key={indexDiaper}>{diaper.amount}</li>
        );
      });
      return (
        <TableRow
          key={indexPatient}>
          <TableRowColumn>{patient.firstName}</TableRowColumn>
          <TableRowColumn>{patient.lastName}</TableRowColumn>
          <TableRowColumn>
            <ul>
              {diaperTypes}
            </ul>
          </TableRowColumn>
          <TableRowColumn>
            <ul>
              {diaperAmounts}
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
    });
    const body = (
      <TableBody
        displayRowCheckbox={false}
        stripedRows>
        {bodyData}
      </TableBody>
    );

    return (
      <div className="layout vertical center-center">
        <Table
          selectable={false}>
          {header}
          {body}
        </Table>
      </div>
    );
  }
}
