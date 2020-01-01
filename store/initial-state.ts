import { ApplicationState } from '@definitions/Application.d';
import initialState from '@core/modules/initial-state';
import projectState from './modules/initial-state';

const combinedState: ApplicationState = {
  ...initialState,
  ...projectState,
};

export default combinedState;
