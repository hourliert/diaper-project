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

    patients: PropTypes.object.isRequired,

    addPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,
  }

  render() {
    const { patients, updatePatient, addPatient, deletePatient } = this.props;
    const { temporaryPatient, setPatient, unsetPatient, addPatientDiaper, removePatientDiaper } = this.props;

    return (
      <CardsList>
        <Card>
          <CardHeader
            title="Saisie"
            subtitle="Entrer un nouveau resident"
            avatar={<Avatar>1</Avatar>}/>
          <PatientInput
            patient={temporaryPatient}
            onSubmit={
              (patient) => {
                (patient._id ? updatePatient : addPatient)(patient);
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
          <PatientsTable
            patients={patients.data}
            onEditRow={setPatient}
            onDeleteRow={
              (patient) => {
                deletePatient(patient._id);
              }
            }/>
        </Card>
      </CardsList>
    );
  }
}
