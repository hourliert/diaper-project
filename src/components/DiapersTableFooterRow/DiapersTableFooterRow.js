import React, { Component, PropTypes } from 'react';
import { TextField, TableRow, TableRowColumn } from 'material-ui';

export default class DiapersTableFooterRow extends Component {
  static propTypes = {
    diapers: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      multiplier: 1,
    };
  }

  _handleMutliplierChange(e) {
    this.setState({
      multiplier: e.target.value,
    });
  }

  render() {
    const { diapers } = this.props;
    const diapersHeader = Object.keys(diapers);

    return (
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
    );
  }
}
