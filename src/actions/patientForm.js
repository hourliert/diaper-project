import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
  UPDATE_PATIENT_FIELD,
  UPDATE_PATIENT_DIAPER_FIELD,
} from '../constants';
import { createActionCreator, createErrorCreator } from './actionCreator';

export const setPatient = createActionCreator(SET_PATIENT);
export const unsetPatient = createActionCreator(UNSET_PATIENT);
export const addPatientDiaper = createActionCreator(ADD_PATIENT_DIAPER);
export const removePatientDiaper = createActionCreator(REMOVE_PATIENT_DIAPER);
export const updatePatientField = createActionCreator(UPDATE_PATIENT_FIELD, (field, value) => ({field, value}));
export const updatePatientDiaperField = createActionCreator(UPDATE_PATIENT_DIAPER_FIELD, (index, field, value) => ({index, field, value}));
