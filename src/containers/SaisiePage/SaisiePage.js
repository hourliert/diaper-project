import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';

import CardsList from '../../components/CardsList';
import PatientsTable from '../../components/PatientsTable';
import PatientInput from '../../components/PatientInput';

import * as PatientsAction from '../../actions/patients';
import * as TemporaryPatientAction from '../../actions/temporaryPatient';

function mapStateToProps(state) {
  return {
    patients: state.patients,
    diaperTypes: state.diaperTypes,
    temporaryPatient: state.temporaryPatient,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...PatientsAction,
    ...TemporaryPatientAction,
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SaisiePage extends Component {

  static propTypes = {
    temporaryPatient: PropTypes.object.isRequired,

    setPatient: PropTypes.func.isRequired,
    unsetPatient: PropTypes.func.isRequired,
    addPatientDiaper: PropTypes.func.isRequired,
    removePatientDiaper: PropTypes.func.isRequired,

    patients: PropTypes.array.isRequired,

    fetchPatients: PropTypes.func.isRequired,
    addPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,

    diaperTypes: PropTypes.array.isRequired,
  }

  render() {
    const { patients, fetchPatients, updatePatient, addPatient, deletePatient } = this.props;
    const { temporaryPatient, setPatient, unsetPatient, addPatientDiaper, removePatientDiaper } = this.props;
    const { diaperTypes } = this.props;

    return (
      <CardsList>
        <Card>
          <CardHeader
            title="Saisie"
            subtitle="Entrer un nouveau resident"
            avatar={<Avatar>1</Avatar>}/>
          <PatientInput
            patient={temporaryPatient}
            diaperTypes={diaperTypes}
            onSubmit={
              (patient) => {
                (patient.id ? updatePatient : addPatient)(patient.id, patient);
              }
            }
            onReset={unsetPatient}
            onTemporarySave={setPatient}
            onAddFields={addPatientDiaper}
            onRemoveFields={removePatientDiaper} />
        </Card>
        <Card>
          <CardHeader
            title="Visualisation"
            subtitle="Liste des couches utilisées pour chaque résident"
            avatar={<Avatar>2</Avatar>}/>
          <button onClick={fetchPatients}>Fetch</button>
          <PatientsTable
            patients={patients}
            diaperTypes={diaperTypes}
            onEditRow={setPatient}
            onDeleteRow={
              (patient) => {
                deletePatient(patient.id);
              }
            }/>
        </Card>
      </CardsList>
    );
  }
}
