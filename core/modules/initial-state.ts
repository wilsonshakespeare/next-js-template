// Export all initial-states
import { ApplicationState } from '../definitions/Application.d';

// initial states
import error from './error/initial-state';
import path from './path/initial-state';

const state: ApplicationState = {
  error,
  path,
};

export default state;
