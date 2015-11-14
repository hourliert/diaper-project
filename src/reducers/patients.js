import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
} from '../constants';
import { createReducer } from './reducerCreator';

export default createReducer({ data: [] }, {
  [FETCH_PATIENTS_REQUEST](state, action) {
    return {
      isFetching: true,
      data: [
        ...state.data,
      ],
    };
  },

  [FETCH_PATIENTS_SUCCESS](state, action) {
    return {
      isFetching: false,
      receivedAt: action.payload.receivedAt,
      data: [
        ...action.payload.patients,
      ],
    };
  },

  [DELETE_PATIENT_REQUEST](state, action) {
    return {
      isDeleting: false,
      data: [
        ...state.data,
      ],
    };
  },

  [DELETE_PATIENT_SUCCESS](state, action) {
    return {
      isDeleting: true,
      receivedAt: action.payload.receivedAt,
      data: state.data.filter(patient =>
        patient._id !== action.payload.deletedId
      ),
    };
  },

  [ADD_PATIENT_REQUEST](state, action) {
    return {
      isAdding: true,
      data: [
        ...state.data,
      ],
    };
  },

  [ADD_PATIENT_SUCCESS](state, action) {
    return {
      isAdding: false,
      receivedAt: action.payload.receivedAt,
      data: [
        action.payload.patient,
        ...state.data,
      ],
    };
  },

  [UPDATE_PATIENT_REQUEST](state, action) {
    return {
      isUpdating: true,
      data: [
        ...state.data,
      ],
    };
  },

  [UPDATE_PATIENT_SUCCESS](state, action) {
    return {
      isUpdating: false,
      receivedAt: action.payload.receivedAt,
      data: state.data.map(patient => {
        return (patient._id === action.payload.patient._id) ?
          action.payload.patient :
          patient;
      }),
    };
  },
});
