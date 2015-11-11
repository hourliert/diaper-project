import { EDIT_PATIENT, CANCEL_EDITION } from '../actions/editedPatient';

export default function editedPatient(state = {}, action) {
  switch (action.type) {
  case EDIT_PATIENT:
    return {
      ...action.payload,
    };
  case CANCEL_EDITION:
    return {};
  default:
    return state;
  }
}
