import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
  UPDATE_PATIENT_FIELD,
  UPDATE_PATIENT_DIAPER_FIELD,
} from '../actions/editedPatient';

export default function editedPatient(state = { diapers: [{}] }, action) {
  switch (action.type) {
  case SET_PATIENT:
    return {
      ...action.payload,
      diapers: action.payload.diapers || [{}],
    };
  case UNSET_PATIENT:
    return {
      diapers: [{}],
    };
  case ADD_PATIENT_DIAPER:
    return {
      ...state,
      diapers: [
        ...state.diapers.slice(),
        {},
      ],
    };
  case REMOVE_PATIENT_DIAPER:
    return {
      ...state,
      diapers: [
        ...state.diapers.slice(0, action.payload.index),
        ...state.diapers.slice(action.payload.index + 1, Infinity),
      ],
    };
  case UPDATE_PATIENT_FIELD:
    return {
      ...state,
      [action.payload.field]: action.payload.value,
    };
  case UPDATE_PATIENT_DIAPER_FIELD:
    return {
      ...state,
      diapers: state.diapers.map((diaper, index) => {
        if (index === action.payload.index) {
          return {
            ...diaper,
            [action.payload.field]: action.payload.value,
          };
        }

        return { ...diaper };
      }),
    };
  default:
    return state;
  }
}
