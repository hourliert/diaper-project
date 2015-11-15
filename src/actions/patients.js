import fetch from 'isomorphic-fetch';
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_FAILURE,
  FETCH_PATIENTS_SUCCESS,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_FAILURE,
  DELETE_PATIENT_SUCCESS,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_FAILURE,
  ADD_PATIENT_SUCCESS,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_FAILURE,
  UPDATE_PATIENT_SUCCESS,
} from '../constants';
import { SERVER_HOSTNAME, SERVER_PORT } from '../config';
import { createActionCreator, createErrorCreator } from './actionCreator';

import { setPatient, unsetPatient } from './temporaryPatient';

async function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${response.statusText} : ${text}`);
  }
}

const fetchPatientsRequest = createActionCreator(FETCH_PATIENTS_REQUEST);
const fetchPatientsFailure = createErrorCreator(FETCH_PATIENTS_FAILURE);
const fetchPatientsSuccess = createActionCreator(FETCH_PATIENTS_SUCCESS, (json) => ({
  patients: json,
  receivedAt: Date.now(),
}));

export function fetchPatients() {
  return async (dispatch) => {
    let json;

    dispatch(fetchPatientsRequest());
    try {
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients`);

      await checkStatus(response);

      json = await response.json();
    } catch (e) {
      dispatch(fetchPatientsFailure(e.message));
      return;
    }

    dispatch(fetchPatientsSuccess(json));
  };
}

const deletePatientsRequest = createActionCreator(DELETE_PATIENT_REQUEST);
const deletePatientsFailure = createErrorCreator(DELETE_PATIENT_FAILURE);
const deletePatientsSuccess = createActionCreator(DELETE_PATIENT_SUCCESS, (id) => ({
  deletedId: id,
  receivedAt: Date.now(),
}));

export function deletePatient(id) {
  return async (dispatch) => {
    dispatch(deletePatientsRequest());
    try {
      const response = await fetch(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/patients/${id}`, {
        method: 'delete',
      });

      await checkStatus(response);
    } catch (e) {
      dispatch(deletePatientsFailure(e.message));
      return;
    }

    dispatch(deletePatientsSuccess(id));
  };
}

const addPatientsRequest = createActionCreator(ADD_PATIENT_REQUEST);
const addPatientsFailure = createErrorCreator(ADD_PATIENT_FAILURE);
const addPatientsSuccess = createActionCreator(ADD_PATIENT_SUCCESS, (json) => ({
  patient: json,
  receivedAt: Date.now(),
}));

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

      await checkStatus(response);

      json = await response.json();
    } catch (e) {
      dispatch(addPatientsFailure(e.message));
      return;
    }

    dispatch(addPatientsSuccess(json));
    dispatch(setPatient(patient));
    dispatch(unsetPatient());
  };
}

const updatePatientsRequest = createActionCreator(UPDATE_PATIENT_REQUEST);
const updatePatientsFailure = createErrorCreator(UPDATE_PATIENT_FAILURE);
const updatePatientsSuccess = createActionCreator(UPDATE_PATIENT_SUCCESS, (json) => ({
  patient: json,
  receivedAt: Date.now(),
}));

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

      await checkStatus(response);
    } catch (e) {
      dispatch(updatePatientsFailure(e.message));
      return;
    }

    dispatch(updatePatientsSuccess(patient));
    dispatch(unsetPatient());
  };
}
