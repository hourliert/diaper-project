import fetch from 'isomorphic-fetch';

export const REQUEST_PATIENTS = 'REQUEST_PATIENTS';
function requestPatients() {
  return {
    type: REQUEST_PATIENTS,
  };
}

export const ERROR_PATIENTS = 'ERROR_PATIENTS';
function errorPatients() {
  return {
    type: ERROR_PATIENTS,
  };
}

export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';
function receivePatients(json) {
  return {
    type: RECEIVE_PATIENTS,
    payload: {
      patients: json,
      receivedAt: Date.now(),
    },
  };
}

export function fetchPatients() {
  return async (dispatch) => {
    let json;

    dispatch(requestPatients());
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      json = await response.json();
    } catch (e) {
      dispatch(errorPatients());
    }

    dispatch(receivePatients(json));
  };
}
