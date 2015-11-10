import fetch from 'isomorphic-fetch';

export const FETCH_PATIENTS_REQUEST = 'FETCH_PATIENTS_REQUEST';
function fetchPatientsRequest() {
  return {
    type: FETCH_PATIENTS_REQUEST,
  };
}

export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';
function fetchPatientsFailure() {
  return {
    type: FETCH_PATIENTS_FAILURE,
  };
}

export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
function fetchPatientsSuccess(json) {
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

    dispatch(fetchPatientsRequest());
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      json = await response.json();
    } catch (e) {
      dispatch(fetchPatientsFailure());
    }

    dispatch(fetchPatientsSuccess(json));
  };
}

export const DELETE_PATIENTS_REQUEST = 'DELETE_PATIENTS_REQUEST';
function deletePatientsRequest() {
  return {
    type: DELETE_PATIENTS_REQUEST,
  };
}

export const DELETE_PATIENTS_FAILURE = 'DELETE_PATIENTS_FAILURE';
function deletePatientsFailure() {
  return {
    type: DELETE_PATIENTS_FAILURE,
  };
}

export const DELETE_PATIENTS_SUCCESS = 'DELETE_PATIENTS_SUCCESS';
function deletePatientsSuccess(id) {
  return {
    type: DELETE_PATIENTS_SUCCESS,
    payload: {
      deletedId: id,
      receivedAt: Date.now(),
    },
  };
}

export function deletePatient(id) {
  return async (dispatch) => {
    dispatch(deletePatientsRequest());
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'delete',
      });
      await response.text();
    } catch (e) {
      dispatch(deletePatientsFailure());
    }

    dispatch(deletePatientsSuccess(id));
  };
}

export const ADD_PATIENTS_REQUEST = 'ADD_PATIENTS_REQUEST';
function addPatientsRequest() {
  return {
    type: ADD_PATIENTS_REQUEST,
  };
}

export const ADD_PATIENTS_FAILURE = 'ADD_PATIENTS_FAILURE';
function addPatientsFailure() {
  return {
    type: ADD_PATIENTS_FAILURE,
  };
}

export const ADD_PATIENTS_SUCCESS = 'ADD_PATIENTS_SUCCESS';
function addPatientsSuccess(json) {
  return {
    type: ADD_PATIENTS_SUCCESS,
    payload: {
      patient: json,
      receivedAt: Date.now(),
    },
  };
}

export function addPatient(patient) {
  return async (dispatch) => {
    let json;

    dispatch(addPatientsRequest());
    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });
      json = await response.json();
    } catch (e) {
      dispatch(addPatientsFailure());
    }

    dispatch(addPatientsSuccess(json));
  };
}
