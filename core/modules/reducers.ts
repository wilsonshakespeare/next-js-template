// export all reducers
import { ApplicationReducers } from '../definitions/Application.d';

// initial states
import error from './error/reducers';
import path from './path/reducers';

const reducers: ApplicationReducers = {
  error,
  path,
};

export default reducers;
