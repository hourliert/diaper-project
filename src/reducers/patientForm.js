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
        ...state.diapers.slice(0, action.payload.index),
        ...state.diapers.slice(action.payload.index + 1, Infinity),
      ],
    };
  },

  [UPDATE_PATIENT_FIELD](state, action) {
    return {
      ...state,
      [action.payload.field]: action.payload.value,
      [`${action.payload.field}Error`]: '',
    };
  },

  [UPDATE_PATIENT_FIELD_ERROR](state, action) {
    return {
      ...state,
      [action.meta.field]: action.meta.value,
      [`${action.meta.field}Error`]: action.payload.message,
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
            [`${action.payload.field}Error`]: '',
          };
        }

        return { ...diaper };
      }),
    };
  },

  [UPDATE_PATIENT_DIAPER_FIELD_ERROR](state, action) {
    return {
      ...state,
      diapers: state.diapers.map((diaper, index) => {
        if (index === action.meta.index) {
          return {
            ...diaper,
            [action.meta.field]: action.meta.value,
            [`${action.meta.field}Error`]: action.payload.message,
          };
        }

        return { ...diaper };
      }),
    };
  },
});
