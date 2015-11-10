import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PatientsAction from '../../actions/patients';
import PatientsTable from '../../components/PatientsTable';

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
      <div>
        <span>saisie</span>
        <PatientsTable {...this.props}/>
      </div>
    );
  }
}