import {
  SET_PATIENT,
  UNSET_PATIENT,
  ADD_PATIENT_DIAPER,
  REMOVE_PATIENT_DIAPER,
  UPDATE_PATIENT_FIELD,
  UPDATE_PATIENT_DIAPER_FIELD,
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
        ...state.diapers.slice(0, action.payload.index),
        ...state.diapers.slice(action.payload.index + 1, Infinity),
      ],
    };
  },

  [UPDATE_PATIENT_FIELD](state, action) {
    return {
      ...state,
      [action.payload.field]: action.payload.value,
    };
  },

  [UPDATE_PATIENT_DIAPER_FIELD](state, action) {
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
  },
});
