import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, FloatingActionButton, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';

import validate from './validationRules';

@reduxForm({
  form: 'patient',
  validate,
})
export default class PatientForm extends Component {
  static propTypes = {
    // redux-form properties
    fields: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    values: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired, // internally calls props.onSubmit

    diaperTypes: PropTypes.array.isRequired,
    onReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    onTemporarySave: PropTypes.func.isRequired,
    onAddFields: PropTypes.func.isRequired,
    onRemoveFields: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _createDiaperFields(diaperFields) {
    const { diaperTypes, onRemoveFields, onTemporarySave } = this.props;
    const keys = Object.keys(diaperFields);
    const fields = [];

    function removeFieldHandler(i) {
      onTemporarySave(this.props.values);
      onRemoveFields(i);
    }

    for (let i = 0, ii = keys.length; i < ii; i += 2) {
      const index = i / 2;
      const diaperTypeField = keys[i];
      const diaperAmountField = keys[i + 1];

      fields.push(
        <div key={index} className="layout horizontal">
          <SelectField
            hintText="Type de couche"
            errorText={diaperFields[diaperTypeField].error}
            valueMember="id"
            displayMember="value"
            menuItems={diaperTypes}
            {...diaperFields[diaperTypeField]}
            value={this.props.values[diaperTypeField]}/>

          <TextField
            type="text"
            hintText="Quantité"
            errorText={diaperFields[diaperAmountField].error}
            {...diaperFields[diaperAmountField]}/>

          {(index) > 0 ?
            <div>
              <FloatingActionButton
                mini
                onClick={removeFieldHandler.bind(this, index)}>
                <i className="material-icons">remove_circle_outline</i>
              </FloatingActionButton>
            </div>
          : null}
       </div>
      );
    }

    return fields;
  }

  render() {
    const { fields: {firstName, lastName, ...diapers }, handleSubmit, resetForm } = this.props;
    const { onReset, onAddFields, onTemporarySave } = this.props;

    return (
      <form
        className="layout horizontal around-justified"
        onSubmit={handleSubmit}
        onReset={
          (...args) => {
            resetForm(...args);
            onReset();
          }
        }>
        <TextField
          type="text"
          hintText="Prénom"
          errorText={firstName.error}
          {...firstName}/>
        <TextField
          type="text"
          hintText="Nom"
          errorText={lastName.error}
          {...lastName}/>

        <div className="layout vertical">
          {this._createDiaperFields(diapers)}
        </div>

        <div>
          <FloatingActionButton
            mini
            className="fab-button"
            onClick={
              () => {
                onTemporarySave(this.props.values);
                onAddFields();
              }
            }>
            <i className="material-icons">add_circle_outline</i>
          </FloatingActionButton>
        </div>

        <RaisedButton
          label="Annuler"
          type="reset"/>
        <RaisedButton
          label="Enregistrer"
          type="submit"/>
      </form>
    );
  }
}
