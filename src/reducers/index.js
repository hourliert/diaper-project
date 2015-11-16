import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import patients from './patients';
import temporaryPatient from './temporaryPatient';
import apiStatus from './apiStatus';
import diaperTypes from './diaperTypes';

const rootReducer = combineReducers({
  patients,
  temporaryPatient,
  apiStatus,
  diaperTypes,
  router: routerStateReducer,
  form: formReducer,
});

export default rootReducer;
