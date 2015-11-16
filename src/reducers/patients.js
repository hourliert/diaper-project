import {
  FETCH_PATIENTS_SUCCESS,
  DELETE_PATIENT_SUCCESS,
  ADD_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
} from '../constants';
import { createReducer } from './reducerCreator';

export default createReducer([], {
  [FETCH_PATIENTS_SUCCESS](state, action) {
    return [
      ...action.payload.patients,
    ];
  },

  [DELETE_PATIENT_SUCCESS](state, action) {
    return state.filter(patient =>
      patient.id !== action.payload.deletedId
    );
  },

  [ADD_PATIENT_SUCCESS](state, action) {
    return [
      action.payload.patient,
      ...state,
    ];
  },

  [UPDATE_PATIENT_SUCCESS](state, action) {
    return state.map(patient => {
      return (patient.id === action.payload.patient.id) ?
        action.payload.patient :
        patient;
    });
  },
});
