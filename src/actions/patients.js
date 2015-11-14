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

import { setPatient } from './patientForm';

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
      json = await response.json();
    } catch (e) {
      dispatch(fetchPatientsFailure());
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
      await response.text();
    } catch (e) {
      dispatch(deletePatientsFailure());
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
      json = await response.json();
    } catch (e) {
      dispatch(addPatientsFailure());
      return;
    }

    dispatch(addPatientsSuccess(json));
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
      await response.text();
    } catch (e) {
      dispatch(updatePatientsFailure());
      return;
    }

    dispatch(updatePatientsSuccess(patient));
    dispatch(setPatient(patient));
  };
}
