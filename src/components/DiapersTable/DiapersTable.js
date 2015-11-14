import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableFooter } from 'material-ui';

import TableHeadersList from '../TableHeadersList';
import DiapersTableRow from '../DiapersTableRow';
import DiapersTableFooter from '../DiapersTableFooter';

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
              patients.map((patient, index) => {
                return (
                  <DiapersTableRow
                    key={index}
                    patient={patient}
                    diapersTypes={diapersHeader} />
                );
              })
            }
          </TableBody>

          <TableFooter
            adjustForCheckbox={false}>
            <DiapersTableFooter
              diapers={diapers}/>
          </TableFooter>
        </Table>
      </div>
    );
  }
}
