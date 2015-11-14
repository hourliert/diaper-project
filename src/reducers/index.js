import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import patients from './patients';
import patientForm from './patientForm';

const rootReducer = combineReducers({
  patients,
  patientForm,
  router: routerStateReducer,
});

export default rootReducer;
