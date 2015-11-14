import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
  UPDATE_PATIENT_FIELD,
  UPDATE_PATIENT_FIELD_ERROR,
  UPDATE_PATIENT_DIAPER_FIELD,
  UPDATE_PATIENT_DIAPER_FIELD_ERROR,
} from '../constants';
import { createReducer } from './reducerCreator';

export default createReducer({ diapers: [{}] }, {
  [SET_PATIENT](state, action) {
    return {
      ...action.payload,
      diapers: action.payload.diapers || [{}],
    };
  },

  [UNSET_PATIENT](state, action) {
    return {
      diapers: [{}],
    };
  },

  [ADD_PATIENT_DIAPER](state, action) {
    return {
      ...state,
      diapers: [
        ...state.diapers.slice(),
        {},
      ],
    };
  },

  [REMOVE_PATIENT_DIAPER](state, action) {
    return {
      ...state,
      diapers: [
        ...state.diapers.slice(0, action.payload),
        ...state.diapers.slice(action.payload + 1, Infinity),
      ],
    };
  },
});
