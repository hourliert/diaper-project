import React, { Component, PropTypes } from 'react';
import { Table } from 'reactabular';
import './PatientsTable.css';

export default class PatientsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          property: 'firstName',
          header: 'First Name',
        },
        {
          property: 'lastName',
          header: 'Last Name',
        },
      ],
    };
  }

  render() {
    const { fetchPatients, patients } = this.props;
    const columns = this.state.columns;

    return (
      <div>
        <button onClick={fetchPatients}>Fetch</button>
        <div>Patients Table</div>
        <Table columns={columns} data={patients.data}/>
      </div>
    );
  }
}

PatientsTable.propTypes = {
  fetchPatients: PropTypes.func.isRequired,
  patients: PropTypes.any.isRequired,
};
