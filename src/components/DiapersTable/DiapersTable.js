import React, { Component, PropTypes } from 'react';
import { TextField, Table, TableBody, TableHeader, TableFooter, TableRow, TableRowColumn } from 'material-ui';

import TableHeadersList from '../TableHeadersList';

export default class DiapersTable extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    onMount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      multiplier: '1',
    };
  }

  componentWillMount() {
    this.props.onMount();
  }

  _formatDiapers(patients) {
    const diapers = {};
    patients.forEach((patient) => {
      patient.diapers.forEach((diaper) => {
        diapers[diaper.type] = diapers[diaper.type] || 0;
        diapers[diaper.type] += parseInt(diaper.amount, 10);
      });
    });
    return diapers;
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

  _handleMutliplierChange(e) {
    this.setState({
      multiplier: e.target.value,
    });
  }

  render() {
    const { patients } = this.props;
    const diapers = this._formatDiapers(patients);
    const diapersHeader = Object.keys(diapers);

    return (
      <div className="layout vertical center-center">
        <Table
          selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableHeadersList
              headers={
                ['Résident'].concat(diapersHeader)
              }/>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            stripedRows>
            {
              patients.map((patient, pIndex) => {
                return (
                  <TableRow
                    key={'body-row' + pIndex}>
                    <TableRowColumn>
                      {patient.firstName} {patient.lastName}
                    </TableRowColumn>
                    {
                      diapersHeader.map((diaperType, dIndex) => {
                        const diaperAmount = this._findDiaperForType(patient, diaperType);

                        return (
                          <TableRowColumn
                            key={'body-cell-' + dIndex}>
                            {diaperAmount > 0 ? diaperAmount : ''}
                          </TableRowColumn>
                        );
                      })
                    }
                  </TableRow>
                );
              })
            }
          </TableBody>

          <TableFooter
            adjustForCheckbox={false}>
            { patients.length ?
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
                {
                  diapersHeader.map((header, index) => {
                    const total = (parseInt(this.state.multiplier, 10) || 1) * parseInt(diapers[header], 10);

                    return (
                      <TableRowColumn key={index}>
                        {total}
                      </TableRowColumn>
                    );
                  })
                }
              </TableRow>
            : null }
          </TableFooter>
        </Table>
      </div>
    );
  }
}
