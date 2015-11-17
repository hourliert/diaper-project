import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableFooter } from 'material-ui';

import TableHeaderLabelsList from '../TableHeaderLabelsList';
import DiapersTableRow from '../DiapersTableRow';
import DiapersTableFooterRow from '../DiapersTableFooterRow';

export default class DiapersTable extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    diaperTypes: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
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
    const { patients, diaperTypes } = this.props;
    const selectedDiapers = this._formatDiapers(patients);
    const selectedDiaperIds = Object.keys(selectedDiapers);

    return (
      <Table
        selectable={false}>

        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableHeaderLabelsList
            headers={
              ['Résident'].concat(selectedDiaperIds.map(id => {
                return diaperTypes.filter(diaper => {
                  return diaper.id === parseInt(id, 10);
                })[0].value;
              }))
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
                  selectedDiaperIds={selectedDiaperIds} />
              );
            })
          }
        </TableBody>

        <TableFooter
          adjustForCheckbox={false}>
          <DiapersTableFooterRow
            selectedDiapers={selectedDiapers}/>
        </TableFooter>
      </Table>
    );
  }
}
