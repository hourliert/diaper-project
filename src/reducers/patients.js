import { REQUEST_PATIENTS, RECEIVE_PATIENTS } from '../actions';

/**
 * Simple reducer that translates the behavior of a counter depending on the
 * action received.
 * @param  {number} state  Counter state
 * @param  {string} action The action
 * @return {number}        New Counter state
 */
export default function patients(state = { data: [] }, action) {
  switch (action.type) {
  case REQUEST_PATIENTS:
    return {
      isFetching: true,
      data: {
        ...state.data,
      },
    };
  case RECEIVE_PATIENTS:
    return {
      isFetching: false,
      data: {
        ...action.payload,
      },
    };
  default:
    return state;
  }
}
