import React, { Component, PropTypes } from 'react';
import { Table } from 'reactabular';
import findIndex from 'lodash.findindex';
import './PatientsTable.css';

export default class PatientsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          property: 'firstName',
          header: 'Prenom',
        },
        {
          property: 'lastName',
          header: 'Nom de famille',
        },
        {
          property: 'diapers',
          header: 'Couche',
          cell: (value) => {
            return (
              <ul>
                {value.map((diaper, index) => {
                  return (
                    <li key={index}>
                      <span>{diaper.type}</span>: <span>{diaper.amount}</span>
                    </li>
                  );
                })}
              </ul>
            );
          },
        },
        {
          cell: (value, cellData, rowIndex) => {
            const { deletePatient } = this.props;

            return {
              value: (
                <span>
                  <span className="remove" onClick={deletePatient.bind(this, cellData[rowIndex]._id)}>
                    &#10007;
                  </span>
                </span>
              ),
            };
          },
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
  deletePatient: PropTypes.func.isRequired,
  patients: PropTypes.any.isRequired,
};
