import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
} from '../constants';
import { createActionCreator } from './actionCreator';

export const setPatient = createActionCreator(SET_PATIENT);
export const unsetPatient = createActionCreator(UNSET_PATIENT);
export const addPatientDiaper = createActionCreator(ADD_PATIENT_DIAPER);
export const removePatientDiaper = createActionCreator(REMOVE_PATIENT_DIAPER);
