// Import your store/module/typings
import { Config, ConfigReducer } from '@store/modules/typings.d';

// Add your project redux state here
export interface ProjectState {
  config: Config;
}

// Add your project reducer function definitions here
export interface ProjectReducers {
  config: ConfigReducer;
}
