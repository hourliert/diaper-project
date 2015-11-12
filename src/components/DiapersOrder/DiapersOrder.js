import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import * as PatientsAction from '../../actions/patients';

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
  return bindActionCreators({
    ...PatientsAction,
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DiapersOrder extends Component {
  static propTypes = {
    patients: PropTypes.object.isRequired,
    fetchPatients: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  render() {
    const { patients } = this.props;
    const diapers = {};

    patients.data.forEach((patient) => {
      patient.diapers.forEach((diaper) => {
        diapers[diaper.type] = diapers[diaper.type] || 0;
        diapers[diaper.type] += parseInt(diaper.amount, 10);
      });
    });

    const header = (
      <TableHeader
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Type de couche</TableHeaderColumn>
          <TableHeaderColumn>Quantité</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );

    const bodyData = Object.keys(diapers).map((diaperKey, index) => {
      return (
        <TableRow
          key={index}>
          <TableRowColumn>{diaperKey}</TableRowColumn>
          <TableRowColumn>{diapers[diaperKey]}</TableRowColumn>
        </TableRow>
      );
    });

    const body = (
      <TableBody
        displayRowCheckbox={false}
        stripedRows>
        {bodyData}
      </TableBody>
    );

    return (
      <div className="layout vertical center-center">
        <Table
          selectable={false}>
          {header}
          {body}
        </Table>
      </div>
    );
  }
}
