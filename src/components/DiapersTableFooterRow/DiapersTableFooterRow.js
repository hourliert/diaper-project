import React, { Component, PropTypes } from 'react';
import { TextField, TableRow, TableRowColumn } from 'material-ui';

export default class DiapersTableFooterRow extends Component {
  static propTypes = {
    selectedDiapers: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      multiplier: 1,
    };
  }

  _handleMutliplierChange(e) {
    const { target: { value } } = e;

    this.setState({
      multiplier: value,
      multiplierError: isNaN(parseInt(value, 10)) ? 'Non entier' : '',
    });
  }

  render() {
    const { selectedDiapers } = this.props;
    const selectedDiaperIds = Object.keys(selectedDiapers);

    return (
      <TableRow>
        <TableRowColumn>
          <div className="layout horizontal center-center">
            <div className="flex-1">Total</div>
            <TextField
              className="flex-1"
              value={this.state.multiplier}
              errorText={this.state.multiplierError}
              hintText="Nombre"
              floatingLabelText="Multiplieur"
              onChange={this._handleMutliplierChange.bind(this)}/>
          </div>
        </TableRowColumn>
        {
          selectedDiaperIds.map((diaperId, index) => {
            const total = (parseInt(this.state.multiplier, 10) || 1) * parseInt(selectedDiapers[diaperId], 10);

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
