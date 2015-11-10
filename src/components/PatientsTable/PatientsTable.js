import React, { Component, PropTypes } from 'react';
import './PatientsTable.css';

export default class PatientsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fetchPatients, patients } = this.props;
    return (
      <div>
        <div>Patients Table</div>
        <div>{JSON.stringify(patients)}</div>
        <button onClick={fetchPatients}>Fetch</button>
      </div>
    );
  }
}

PatientsTable.propTypes = {
  fetchPatients: PropTypes.func.isRequired,
  patients: PropTypes.any.isRequired,
};
