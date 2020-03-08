// Don't Change this File: Project Level combining core modules and project modules types

import {
  ApplicationState as BaseApplicationState,
  ApplicationReducers as BaseApplicationReducers,
  StoreType,
  CommonHooksOption as CommonHooksOptionBase,
  CommonHooksProps as CommonHooksPropsBase,
} from '@core/definitions/Application.d';
import { PageContext as PageContextBase } from '@core/definitions/Page.d';
import { Reducer, CombinedState } from 'redux';
import { ProjectState, ProjectReducers } from './ProjectApplication.d';
import { Config } from '@store/modules/typings';

export { ProjectState, ProjectReducers } from './ProjectApplication.d';

export interface ApplicationState extends BaseApplicationState, ProjectState {}

export interface ApplicationReducers extends BaseApplicationReducers, ProjectReducers {}

export interface IStoreType extends StoreType<ApplicationState> {}

export type CombinedReducer = Reducer<CombinedState<ApplicationState>>;

export interface PageContext extends PageContextBase<ApplicationState> {}

export interface CommonHooksOption extends CommonHooksOptionBase {
  hasConfig?: boolean;
}

export interface CommonHooksProps extends CommonHooksPropsBase {
  config?: Config;
}

// TODO: Refactor This after testing
export interface AppPropsBase {
  isServer: boolean;
  hostname: string;
  protocol: string;
  asPath: string;
}
