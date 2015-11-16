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
    this.state = {
      multiplier: '1',
    };
  }

  _formatDiapers(patients) {
    const { diaperTypes } = this.props;
    const diapers = {};
    patients.forEach((patient) => {
      patient.diapers.forEach((diaper) => {
        const key = diaperTypes.filter((diaperType) => {
          return diaperType.id === diaper.type;
        })[0].value;
        diapers[key] = diapers[key] || 0;
        diapers[key] += parseInt(diaper.amount, 10);
      });
    });
    return diapers;
  }

  render() {
    const { patients } = this.props;
    const diapers = this._formatDiapers(patients);
    const diapersHeader = Object.keys(diapers);

    return (
      <Table
        selectable={false}>

        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableHeaderLabelsList
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
          <DiapersTableFooterRow
            diapers={diapers}/>
        </TableFooter>
      </Table>
    );
  }
}
