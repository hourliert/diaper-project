import fetch from 'isomorphic-fetch';

export const FETCH_PATIENTS_REQUEST = 'FETCH_PATIENTS_REQUEST';
function requestPatients() {
  return {
    type: FETCH_PATIENTS_REQUEST,
  };
}

export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';
function errorPatients() {
  return {
    type: FETCH_PATIENTS_FAILURE,
  };
}

export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
function receivePatients(json) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
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
