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
import { createReducer } from './reducerCreator';

export default createReducer({}, {
  [FETCH_PATIENTS_REQUEST]() {
    return {
      isLoading: true,
    };
  },

  [FETCH_PATIENTS_FAILURE](state, action) {
    return {
      isLoading: false,
      error: action.payload.message,
    };
  },

  [FETCH_PATIENTS_SUCCESS]() {
    return {
      isLoading: false,
    };
  },

  [DELETE_PATIENT_REQUEST]() {
    return {
      isLoading: true,
    };
  },

  [DELETE_PATIENT_FAILURE](state, action) {
    return {
      isLoading: false,
      error: action.payload.message,
    };
  },

  [DELETE_PATIENT_SUCCESS]() {
    return {
      isLoading: false,
    };
  },

  [ADD_PATIENT_REQUEST]() {
    return {
      isLoading: true,
    };
  },

  [ADD_PATIENT_FAILURE](state, action) {
    return {
      isLoading: false,
      error: action.payload.message,
    };
  },

  [ADD_PATIENT_SUCCESS]() {
    return {
      isLoading: false,
    };
  },

  [UPDATE_PATIENT_REQUEST]() {
    return {
      isLoading: true,
    };
  },

  [UPDATE_PATIENT_FAILURE](state, action) {
    return {
      isLoading: false,
      error: action.payload.message,
    };
  },

  [UPDATE_PATIENT_SUCCESS]() {
    return {
      isLoading: false,
    };
  },
});
