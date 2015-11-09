import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

/**
 * Simple reducer that translates the behavior of a counter depending on the
 * action received.
 * @param  {number} state  Counter state
 * @param  {string} action The action
 * @return {number}        New Counter state
 */
export default function counter(state = 0, action) {
  switch (action.type) {
  case SET_COUNTER:
    return action.payload;
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}
