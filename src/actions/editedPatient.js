export const SET_PATIENT = 'SET_PATIENT';
export function setPatient(patient) {
  return {
    type: SET_PATIENT,
    payload: patient,
  };
}

export const UNSET_PATIENT = 'UNSET_PATIENT';
export function unsetPatient() {
  return {
    type: UNSET_PATIENT,
  };
}

export const ADD_PATIENT_DIAPER = 'ADD_PATIENT_DIAPER';
export function addPatientDiaper() {
  return {
    type: ADD_PATIENT_DIAPER,
  };
}

export const REMOVE_PATIENT_DIAPER = 'REMOVE_PATIENT_DIAPER';
export function removePatientDiaper(index) {
  return {
    type: REMOVE_PATIENT_DIAPER,
    payload: { index },
  };
}

export const UPDATE_PATIENT_FIELD = 'UPDATE_PATIENT_FIELD';
export function updatePatientField(field, value) {
  return {
    type: UPDATE_PATIENT_FIELD,
    payload: {field, value},
  };
}

export const UPDATE_PATIENT_DIAPER_FIELD = 'UPDATE_PATIENT_DIAPER_FIELD';
export function updatePatientDiaperField(index, field, value) {
  return {
    type: UPDATE_PATIENT_DIAPER_FIELD,
    payload: {index, field, value},
  };
}
