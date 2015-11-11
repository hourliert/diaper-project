import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, Avatar } from 'material-ui';

import * as PatientsAction from '../../actions/patients';
import PatientsTable from '../../components/PatientsTable';
import PatientInput from '../../components/PatientInput';

import './SaisiePage.css';

function mapStateToProps(state) {
  return {
    patients: state.patients,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(PatientsAction, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SaisiePage extends Component {
  render() {
    return (
      <div className="layout vertical">
        <Card className="padded">
          <CardHeader
            title="Saisie"
            subtitle="Entrer un nouveau resident"
            avatar={<Avatar>1</Avatar>}/>
          <PatientInput {...this.props} />
        </Card>
        <Card className="padded">
          <CardHeader
            title="Visualisation"
            subtitle="Liste des couches utilisées pour chaque résident"
            avatar={<Avatar>2</Avatar>}/>
          <PatientsTable className="flex" {...this.props} />
        </Card>
      </div>
    );
  }
}
