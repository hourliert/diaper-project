import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, RaisedButton } from 'material-ui';

// import { Table } from 'reactabular';
import './PatientsTable.css';

export default class PatientsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: -1,
    };
  }

  _handleRowSelected(e) {
    this.setState({
      selectedPatientId: this.props.patients.data[e[0]]._id,
      selectedRow: e[0],
    });
  }

  render() {
    const { fetchPatients, deletePatient, patients } = this.props;
    const { selectedRow, selectedPatientId } = this.state;

    const header = (
      <TableHeader>
        <TableRow>
          <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
            Couches par patient
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn
            tooltip="Prénom du patient">Prénom</TableHeaderColumn>
          <TableHeaderColumn
            tooltip="Nom du patient">Nom</TableHeaderColumn>
          <TableHeaderColumn
            tooltip="Couches utilisées">Couches</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );

    const bodyData = patients.data.map((patient, indexPatient) => {
      const diapers = patient.diapers.map((diaper, indexDiaper) => {
        return (
          <li key={indexDiaper}>{diaper.type}: {diaper.amount}</li>
        );
      });
      return (
        <TableRow
          key={indexPatient}
          selected={indexPatient === selectedRow}>
          <TableRowColumn>{patient.firstName}</TableRowColumn>
          <TableRowColumn>{patient.lastName}</TableRowColumn>
          <TableRowColumn>
            <ul>
              {diapers}
            </ul>
          </TableRowColumn>
        </TableRow>
      );
    });
    const body = (
      <TableBody>
        {bodyData}
      </TableBody>
    );

    return (
      <div className="layout vertical center-center">
        <button onClick={fetchPatients}>Fetch</button>
        <div className="padded">
          <RaisedButton
            label="Supprimer"
            onClick={deletePatient.bind(this, selectedPatientId)}/>
        </div>
        <Table onRowSelection={this._handleRowSelected.bind(this)}>
          {header}
          {body}
        </Table>
      </div>
    );
  }
}

PatientsTable.propTypes = {
  fetchPatients: PropTypes.func.isRequired,
  deletePatient: PropTypes.func.isRequired,
  patients: PropTypes.any.isRequired,
};
