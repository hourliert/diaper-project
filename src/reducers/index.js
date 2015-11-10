import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import patients from './patients';

const rootReducer = combineReducers({
  patients,
  router: routerStateReducer,
});

export default rootReducer;
