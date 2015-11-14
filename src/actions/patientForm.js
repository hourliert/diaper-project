import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
  UPDATE_PATIENT_FIELD,
  UPDATE_PATIENT_FIELD_ERROR,
  UPDATE_PATIENT_DIAPER_FIELD,
  UPDATE_PATIENT_DIAPER_FIELD_ERROR,
} from '../constants';
import { createActionCreator, createErrorCreator } from './actionCreator';

export const setPatient = createActionCreator(SET_PATIENT);
export const unsetPatient = createActionCreator(UNSET_PATIENT);
export const addPatientDiaper = createActionCreator(ADD_PATIENT_DIAPER);
export const removePatientDiaper = createActionCreator(REMOVE_PATIENT_DIAPER);

const updatePatientFieldSuccess = createActionCreator(UPDATE_PATIENT_FIELD, (field, value) => ({field, value}));
const updatePatientFieldError = createErrorCreator(UPDATE_PATIENT_FIELD_ERROR, (field, value) => ({field, value}));

export function updatePatientField(field, value) {
  return (dispatch) => {
    if (value.length < 2) {
      dispatch(updatePatientFieldError('Trop court.', field, value));
      return;
    }

    dispatch(updatePatientFieldSuccess(field, value));
  };
}

const updatePatientDiaperSuccess = createActionCreator(UPDATE_PATIENT_DIAPER_FIELD, (index, field, value) => ({index, field, value}));
const updatePatientDiaperError = createErrorCreator(UPDATE_PATIENT_DIAPER_FIELD_ERROR, (index, field, value) => ({index, field, value}));

export function updatePatientDiaperField(index, field, value) {
  return (dispatch) => {
    switch (field) {
      case 'amount':
        if (isNaN(parseInt(value, 10))) {
          dispatch(updatePatientDiaperError('Non entier.', index, field, value));
          return;
        }

        break;
      case 'type':
        if (value.length < 2) {
          dispatch(updatePatientDiaperError('Trop court.', index, field, value));
          return;
        }

        break;
    }
    dispatch(updatePatientDiaperSuccess(index, field, value));
  };
}
