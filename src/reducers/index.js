import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import patients from './patients';
import temporaryPatient from './temporaryPatient';

const rootReducer = combineReducers({
  patients,
  temporaryPatient,
  router: routerStateReducer,
  form: formReducer,
});

export default rootReducer;
