import { ProjectReducers } from '@definitions/Application.d';

// initial states
import config from './config/reducers';

const reducers: ProjectReducers = {
  config,
};

export default reducers;
