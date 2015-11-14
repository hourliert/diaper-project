import React, { Component, PropTypes } from 'react';

import PatientForm from '../PatientForm';

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

  _convertPatientToForm(patient) {
    const { firstName, lastName, diapers } = patient;
    const res = {
      firstName,
      lastName,
      ...(Object.assign({}, ...diapers.map((diaper, index) => {
        return {
          [`diapers.${index}.type`]: diaper.type,
          [`diapers.${index}.amount`]: diaper.amount,
        };
      }))),
    };

    return res;
  }

  _convertFormToPatient(form) {
    const { firstName, lastName, ...splitedDiapers } = form;
    const diaperKeys = Object.keys(splitedDiapers);
    const diapers = [];

    for (let i = 0, ii = diaperKeys.length; i < ii; i += 2) {
      diapers.push({
        type: splitedDiapers[diaperKeys[i]],
        amount: splitedDiapers[diaperKeys[i + 1]],
      });
    }

    return {
      firstName,
      lastName,
      diapers,
    };
  }

  render() {
    const { patient, onSubmit, onReset, onAddFields, onRemoveFields, onFieldChange, onDiaperChange} = this.props;

    const initialValues = this._convertPatientToForm(patient);

    return (
      <PatientForm
        fields={Object.keys(initialValues)}
        initialValues={initialValues}
        onAddFields={onAddFields}
        onRemoveFields={onRemoveFields}
        onReset={onReset}
        onSubmit={
          (e) => {
            this._convertFormToPatient(e);
          }
        }/>
    );
  }
}
