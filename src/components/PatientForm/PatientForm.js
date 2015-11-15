import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, FloatingActionButton, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';

import validate from './validationRules';

const diaperTypes = [
   { text: 'Couche 1' },
   { text: 'Couche 2' },
   { text: 'Couche 3' },
   { text: 'Couche 4' },
   { text: 'Couche 5' },
];

@reduxForm({
  form: 'patient',
  validate,
})
export default class PatientForm extends Component {
  static propTypes = {
    // redux-form properties
    fields: PropTypes.array.isRequired,
    initialValues: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired, // internally calls props.onSubmit

    onReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTemporarySave: PropTypes.func.isRequired,
    onAddFields: PropTypes.func.isRequired,
    onRemoveFields: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _createDiaperFields(diaperFields) {
    const { onRemoveFields, onTemporarySave } = this.props;
    const fields = [];
    const keys = Object.keys(diaperFields);

    const removeFieldHandler = (i) => {
      onTemporarySave(this.props.values);
      onRemoveFields(i / 2);
    };

    for (let i = 0, ii = keys.length; i < ii; i += 2) {
      fields.push(
       <div key={i / 2} className="layout horizontal">
         <SelectField
           {...diaperFields[keys[i]]}
           value={this.props.values[keys[i]]}
           errorText={diaperFields[keys[i]].error}
           hintText="Type de couche"
           valueMember="text"
           displayMember="text"
           menuItems={diaperTypes}/>

         <TextField
           type="text"
           hintText="Quantité"
           errorText={diaperFields[keys[i + 1]].error}
           {...diaperFields[keys[i + 1]]}/>

         {(i / 2) > 0 ?
           <div>
             <FloatingActionButton
               mini
               onClick={removeFieldHandler.bind(this, i)}>
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
            resetForm(args);
            onReset();
          }
        }>
        <TextField
          type="text"
          hintText="Prénom"
          {...firstName}
          errorText={firstName.error}/>
        <TextField
          type="text"
          hintText="Nom"
          {...lastName}
          errorText={lastName.error}/>

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
