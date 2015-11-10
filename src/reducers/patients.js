import { FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_SUCCESS } from '../actions';

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
  default:
    return state;
  }
}
