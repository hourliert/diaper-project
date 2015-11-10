import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, FloatingActionButton } from 'material-ui';
import './PatientInput.css';

const diaperTypes = [
   { text: 'Couche 1' },
   { text: 'Couche 2' },
   { text: 'Couche 3' },
   { text: 'Couche 4' },
   { text: 'Couche 5' },
];

export default class PatientInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      diapers: [{}],
    };
  }

  _handleAddDiaper() {
    const diapers = this.state.diapers.slice();
    diapers.push({});
    this.setState({ diapers });
  }

  _handleDeleteDiaper(index) {
    const diapers = this.state.diapers.slice();
    diapers.splice(index, 1);
    this.setState({ diapers });
  }

  _handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  _handleDiaperChange(index, key, e) {
    const diapers = this.state.diapers.slice();

    diapers[index][key] = e.target.value;

    this.setState({ diapers });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.addPatient(this.state);
  }

  render() {
    const couche = [];

    this.state.diapers.forEach((diaper, index) => {
      let removeButton;
      if (index > 0) {
        removeButton = (
          <FloatingActionButton mini onClick={this._handleDeleteDiaper.bind(this, index)}>
            <i className="material-icons">remove_circle_outline</i>
          </FloatingActionButton>
        );
      }

      couche.push(
        <div key={index}>
          <SelectField
            value={diaper.type}
            onChange={this._handleDiaperChange.bind(this, index, 'type')}
            hintText="Type de couche"
            valueMember="text"
            displayMember="text"
            menuItems={diaperTypes} />

          <TextField
            type="text"
            hintText="Quantité"
            value={diaper.amount}
            onChange={this._handleDiaperChange.bind(this, index, 'amount')}/>

          {removeButton}

        </div>
      );
    });

    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <TextField
          type="text"
          hintText="Prénom"
          value={this.state.firstName}
          onChange={this._handleChange.bind(this, 'firstName')}/>
        <TextField
          type="text"
          hintText="Nom"
          value={this.state.lastName}
          onChange={this._handleChange.bind(this, 'lastName')}/>

        <FloatingActionButton mini onClick={this._handleAddDiaper.bind(this)}>
          <i className="material-icons">add_circle_outline</i>
        </FloatingActionButton>
        <div>
          {couche}
        </div>

        <button
          type="submit">Submit</button>
      </form>
    );
  }
}

PatientInput.propTypes = {
  addPatient: PropTypes.func.isRequired,
};
