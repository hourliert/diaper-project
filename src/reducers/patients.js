import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  DELETE_PATIENTS_REQUEST,
  DELETE_PATIENTS_SUCCESS,
} from '../actions';

/**
 * Simple reducer that translates the behavior of a counter depending on the
 * action received.
 * @param  {number} state  Counter state
 * @param  {string} action The action
 * @return {number}        New Counter state
 */
export default function patients(state = { data: [] }, action) {
  switch (action.type) {
  case FETCH_PATIENTS_REQUEST:
    return {
      isFetching: true,
      data: [
        ...state.data,
      ],
    };
  case FETCH_PATIENTS_SUCCESS:
    return {
      isFetching: false,
      receivedAt: action.payload.receivedAt,
      data: [
        ...action.payload.patients,
      ],
    };
  case DELETE_PATIENTS_REQUEST:
    return {
      isDeleting: false,
      data: [
        ...state.data,
      ],
    };
  case DELETE_PATIENTS_SUCCESS:
    return {
      isDeleting: true,
      receivedAt: action.payload.receivedAt,
      data: state.data.filter(patient =>
        patient._id !== action.payload.deletedId
      ),
    };
  default:
    return state;
  }
}
