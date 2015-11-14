import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import patients from './patients';
import patientForm from './patientForm';

const rootReducer = combineReducers({
  patients,
  patientForm,
  router: routerStateReducer,
  form: formReducer,
});

export default rootReducer;
