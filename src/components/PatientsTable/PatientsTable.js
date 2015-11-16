import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader } from 'material-ui';

import TableHeaderLabelsList from '../TableHeaderLabelsList';
import PatientsTableRow from '../PatientsTableRow';

export default class PatientsTable extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    diaperTypes: PropTypes.array.isRequired,

    onEditRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { patients, diaperTypes, onEditRow, onDeleteRow } = this.props;

    return (
      <Table
        selectable={false}>

        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableHeaderLabelsList
            headers={['Prénom', 'Nom', 'Types de couches', 'Quantités', '']}/>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          stripedRows>
          {
            patients.map((patient, index) => {
              return (
                <PatientsTableRow
                  key={index}
                  patient={patient}
                  diaperTypes={diaperTypes}
                  onEditRow={onEditRow}
                  onDeleteRow={onDeleteRow} />
              );
            })
          }
        </TableBody>
      </Table>
    );
  }
}
