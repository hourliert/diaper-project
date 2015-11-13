import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';
import Radium, { Style } from 'radium';

import PatientsTable from '../../components/PatientsTable';
import PatientInput from '../../components/PatientInput';

import * as PatientsAction from '../../actions/patients';
import * as EditedPatient from '../../actions/editedPatient';

import styles from './styles';

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

@Radium
@connect(mapStateToProps, mapDispatchToProps)
export default class SaisiePage extends Component {

  static propTypes = {
    patients: PropTypes.object.isRequired,

    editedPatient: PropTypes.object.isRequired,

    fetchPatients: PropTypes.func.isRequired,
    addPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,

    editPatient: PropTypes.func.isRequired,
    cancelEdition: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="layout vertical">
        <Style rules={styles}/>
        <div style={[styles.padded]}>
          <Card className="padded">
            <CardHeader
              title="Saisie"
              subtitle="Entrer un nouveau resident"
              avatar={<Avatar>1</Avatar>}/>
            <PatientInput {...this.props} />
          </Card>
        </div>

        <div style={[styles.padded]}>
          <Card className="padded">
            <CardHeader
              title="Visualisation"
              subtitle="Liste des couches utilisées pour chaque résident"
              avatar={<Avatar>2</Avatar>}/>
            <PatientsTable className="flex" {...this.props} />
          </Card>
        </div>
      </div>
    );
  }
}
