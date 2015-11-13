import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, FloatingActionButton, RaisedButton } from 'material-ui';

const diaperTypes = [
   { text: 'Couche 1' },
   { text: 'Couche 2' },
   { text: 'Couche 3' },
   { text: 'Couche 4' },
   { text: 'Couche 5' },
];

export default class PatientInput extends Component {
  static propTypes = {
    patient: PropTypes.object.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,

    onAddFields: PropTypes.func.isRequired,
    onRemoveFields: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onDiaperChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { patient, onSubmit, onReset, onAddFields, onRemoveFields, onFieldChange, onDiaperChange} = this.props;

    return (
      <form
        className="layout horizontal around-justified"
        onSubmit={onSubmit}
        onReset={onReset}>
        <TextField
          type="text"
          hintText="Prénom"
          value={patient.firstName}
          onChange={onFieldChange.bind(null, 'firstName')}/>
        <TextField
          type="text"
          hintText="Nom"
          value={patient.lastName}
          onChange={onFieldChange.bind(null, 'lastName')}/>

        <div className="layout vertical">
          {
            patient.diapers.map((diaper, index) => {
              return (
                <div key={index} className="layout horizontal">
                  <SelectField
                    value={diaper.type}
                    onChange={onDiaperChange.bind(null, index, 'type')}
                    hintText="Type de couche"
                    valueMember="text"
                    displayMember="text"
                    menuItems={diaperTypes} />

                  <TextField
                    type="text"
                    hintText="Quantité"
                    value={diaper.amount}
                    onChange={onDiaperChange.bind(null, index, 'amount')}/>

                  {index > 0 ?
                    <div>
                      <FloatingActionButton
                        mini
                        onClick={onRemoveFields.bind(this, index)}>
                        <i className="material-icons">remove_circle_outline</i>
                      </FloatingActionButton>
                    </div>
                  : null}

                </div>
              );
            })
          }
        </div>

        <div>
          <FloatingActionButton
            mini
            className="fab-button"
            onClick={onAddFields}>
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
