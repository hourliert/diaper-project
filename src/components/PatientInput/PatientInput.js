import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, SelectField, FloatingActionButton, RaisedButton } from 'material-ui';

import * as EditedPatient from '../../actions/editedPatient';
import './PatientInput.css';

const diaperTypes = [
   { text: 'Couche 1' },
   { text: 'Couche 2' },
   { text: 'Couche 3' },
   { text: 'Couche 4' },
   { text: 'Couche 5' },
];

function mapStateToProps(state) {
  return {
    editedPatient: state.editedPatient,
  };
}

/**
 * We bind actions to the component props.
 * These actions are used to dispatch an action to the redux store.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(EditedPatient, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PatientInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      diapers: [{}],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { editedPatient } = nextProps;
    this._mapPropsToState(editedPatient);
    return true;
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

    if (this.state._id) {
      this.props.updatePatient(this.state);
    } else {
      this.props.addPatient(this.state);
    }

    // todo: handle errors
    this.state = {
      firstName: '',
      lastName: '',
      diapers: [{}],
    };
  }

  _mapPropsToState(patient) {
    if (!patient._id) {
      this.state = {
        firstName: '',
        lastName: '',
        diapers: [{}],
      };
    } else {
      this.setState({
        ...patient,
      });
    }
  }

  render() {
    const { cancelEdition } = this.props;
    const couches = [];

    const cancelEditionButton = this.state._id ? (
      <RaisedButton
        label="Annuler"
        onClick={cancelEdition.bind(this)}/>
    ) : undefined;

    this.state.diapers.forEach((diaper, index) => {
      let removeButton;
      if (index > 0) {
        removeButton = (
          <div>
            <FloatingActionButton
              mini
              onClick={this._handleDeleteDiaper.bind(this, index)}>
              <i className="material-icons">remove_circle_outline</i>
            </FloatingActionButton>
          </div>
        );
      }

      couches.push(
        <div key={index} className="layout horizontal">
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
      <form
        className="layout horizontal around-justified"
        onSubmit={this._handleSubmit.bind(this)}>
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

        <div className="layout vertical">
          {couches}
        </div>

        <div>
          <FloatingActionButton
            mini
            className="fab-button"
            onClick={this._handleAddDiaper.bind(this)}>
            <i className="material-icons">add_circle_outline</i>
          </FloatingActionButton>
        </div>

        {cancelEditionButton}
        <RaisedButton
          label={this.state._id ? 'Enregistrer' : 'Ajouter'}
          type="submit"/>
      </form>
    );
  }
}

PatientInput.propTypes = {
  addPatient: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func.isRequired,
  editedPatient: PropTypes.any.isRequired,
};
