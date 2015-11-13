import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';

import CardsList from '../../components/CardsList';
import PatientsTable from '../../components/PatientsTable';
import PatientInput from '../../components/PatientInput';

import * as PatientsAction from '../../actions/patients';
import * as EditedPatient from '../../actions/editedPatient';

function mapStateToProps(state) {
  return {
    patients: state.patients,
    editedPatient: state.editedPatient,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...PatientsAction,
    ...EditedPatient,
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SaisiePage extends Component {

  static propTypes = {
    patients: PropTypes.object.isRequired,

    editedPatient: PropTypes.object.isRequired,

    setPatient: PropTypes.func.isRequired,
    unsetPatient: PropTypes.func.isRequired,
    addPatientDiaper: PropTypes.func.isRequired,
    removePatientDiaper: PropTypes.func.isRequired,
    updatePatientField: PropTypes.func.isRequired,
    updatePatientDiaperField: PropTypes.func.isRequired,

    fetchPatients: PropTypes.func.isRequired,
    addPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,
  }

  render() {
    const { editedPatient, updatePatient, addPatient, unsetPatient, addPatientDiaper, removePatientDiaper, updatePatientField, updatePatientDiaperField } = this.props;

    return (
      <CardsList>
        <Card>
          <CardHeader
            title="Saisie"
            subtitle="Entrer un nouveau resident"
            avatar={<Avatar>1</Avatar>}/>
          <PatientInput
            patient={editedPatient}
            onSubmit={
              (patient) => {
                [patient._id ? updatePatient.name : addPatient.name](patient);
              }
            }
            onReset={unsetPatient}
            onAddFields={addPatientDiaper}
            onRemoveFields={(removePatientDiaper)}
            onFieldChange={
              (field, e) => {
                updatePatientField(field, e.target.value);
              }
            }
            onDiaperChange={
              (index, field, e) => {
                updatePatientDiaperField(index, field, e.target.value);
              }
            } />
        </Card>
        <Card>
          <CardHeader
            title="Visualisation"
            subtitle="Liste des couches utilisées pour chaque résident"
            avatar={<Avatar>2</Avatar>}/>
        </Card>
      </CardsList>
    );
  }
}
