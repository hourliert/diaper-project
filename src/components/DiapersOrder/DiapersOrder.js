import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

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
    this.state = {
      multiplier: '1',
    };
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  _formatDiapers(patients) {
    const diapers = {};
    patients.data.forEach((patient) => {
      patient.diapers.forEach((diaper) => {
        diapers[diaper.type] = diapers[diaper.type] || 0;
        diapers[diaper.type] += parseInt(diaper.amount, 10);
      });
    });
    return diapers;
  }

  _computeHeader(diapersHeader) {
    const headerContent = diapersHeader.map((diaperType, index) => {
      return (
        <TableHeaderColumn key={'header-' + index}>{diaperType}</TableHeaderColumn>
      );
    });

    headerContent.unshift(
      <TableHeaderColumn>Résident</TableHeaderColumn>
    );

    return (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          {headerContent}
        </TableRow>
      </TableHeader>
    );
  }

  _findDiaperForType(patient, diaperType) {
    let res = 0;
    patient.diapers.forEach((diaper) => {
      if (diaper.type === diaperType) {
        res = diaper.amount;
      }
    });
    return res;
  }

  _computeBody(diapersHeader, patients) {
    const bodyContent = patients.data.map((patient, pIndex) => {
      const diaperColumns = diapersHeader.map((diaperType, dIndex) => {
        const diaperAmount = this._findDiaperForType(patient, diaperType);

        return (
          <TableRowColumn
            key={dIndex}>
            {diaperAmount > 0 ? diaperAmount : ''}
          </TableRowColumn>
        );
      });

      return (
        <TableRow
          key={pIndex}>
          <TableRowColumn>
            {patient.firstName} {patient.lastName}
          </TableRowColumn>
          {diaperColumns}
        </TableRow>
      );
    });

    return (
      <TableBody
        displayRowCheckbox={false}
        stripedRows>
        {bodyContent}
      </TableBody>
    );
  }

  _handleMutliplierChange(e) {
    this.setState({
      multiplier: e.target.value,
    });
  }

  _computeFooter(diapersHeader, diapers) {
    const footerContent = diapersHeader.map((header, index) => {
      const total = (parseInt(this.state.multiplier, 10) || 1) * parseInt(diapers[header], 10);

      return (
        <TableRowColumn key={index}>
          {total}
        </TableRowColumn>
      );
    });

    return (
      <TableFooter
        adjustForCheckbox={false}>
        <TableRow>
          <TableRowColumn>
            <div className="layout horizontal center-center">
              <div className="flex-1">Total</div>
              <TextField
                className="flex-1"
                value={this.state.multiplier}
                hintText="Nombre"
                floatingLabelText="Multiplieur"
                onChange={this._handleMutliplierChange.bind(this)}/>
            </div>
          </TableRowColumn>
          {footerContent}
        </TableRow>
      </TableFooter>
    );
  }

  render() {
    const { patients } = this.props;
    const diapers = this._formatDiapers(patients);
    const diapersHeader = Object.keys(diapers);

    return (
      <div className="layout vertical center-center">
        <Table
          selectable={false}>
          {this._computeHeader(diapersHeader)}
          {this._computeBody(diapersHeader, patients)}
          {this._computeFooter(diapersHeader, diapers)}
        </Table>
      </div>
    );
  }
}
