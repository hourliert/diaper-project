import { SERVER_HOSTNAME, SERVER_PORT } from '../config';
import fetch from 'isomorphic-fetch';

import { editPatient } from './editedPatient';

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
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients`);
      json = await response.json();
    } catch (e) {
      dispatch(fetchPatientsFailure());
      return;
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
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients/${id}`, {
        method: 'delete',
      });
      await response.text();
    } catch (e) {
      dispatch(deletePatientsFailure());
      return;
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
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients`, {
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
      return;
    }

    dispatch(addPatientsSuccess(json));
  };
}

export const UPDATE_PATIENTS_REQUEST = 'UPDATE_PATIENTS_REQUEST';
function updatePatientsRequest() {
  return {
    type: UPDATE_PATIENTS_REQUEST,
  };
}

export const UPDATE_PATIENTS_FAILURE = 'UPDATE_PATIENTS_FAILURE';
function updatePatientsFailure() {
  return {
    type: UPDATE_PATIENTS_FAILURE,
  };
}

export const UPDATE_PATIENTS_SUCCESS = 'UPDATE_PATIENTS_SUCCESS';
function updatePatientsSuccess(json) {
  return {
    type: UPDATE_PATIENTS_SUCCESS,
    payload: {
      patient: json,
      receivedAt: Date.now(),
    },
  };
}

export function updatePatient(patient) {
  return async (dispatch) => {
    dispatch(updatePatientsRequest());
    try {
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients/${patient._id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });
      await response.text();
    } catch (e) {
      dispatch(updatePatientsFailure());
      return;
    }

    dispatch(updatePatientsSuccess(patient));
    dispatch(editPatient(patient));
  };
}
