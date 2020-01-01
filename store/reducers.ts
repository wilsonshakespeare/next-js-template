import { combineReducers } from 'redux';
import { ApplicationReducers } from '@definitions/Application.d';
import reducers from '@core/modules/reducers';
import projectReducers from './modules/reducers';
// import project modules reducers

const applicationReducers: ApplicationReducers = {
  ...reducers,
  ...projectReducers,
};

export default combineReducers(applicationReducers);
