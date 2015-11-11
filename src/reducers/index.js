import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import patients from './patients';
import editedPatient from './editedPatient';

const rootReducer = combineReducers({
  patients,
  editedPatient,
  router: routerStateReducer,
});

export default rootReducer;
