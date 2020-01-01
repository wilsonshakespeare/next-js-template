import { Task } from 'redux-saga';
import { Dispatch } from 'redux';
import {
  ErrorModuleItem,
  ErrorState,
  ErrorReducer,
  PathState,
  PathReducer,
} from '../modules/typings.d';

export interface CommonHooksOption {
  hasError?: boolean;
  hasPath?: boolean;
}

export interface CommonHooksProps {
  error?: ErrorModuleItem;
  path?: PathState;
}

export interface ApplicationState {
  error: ErrorState;
  path: PathState;
}

export interface ApplicationReducers {
  error: ErrorReducer;
  path: PathReducer;
}

export interface StoreType<AppState = {}> {
  saga?: Task;
  runSaga?: () => void;
  stopSaga?: () => void;
  execSagaTasks?: (isServer: any, tasks: any) => void;
  dispatch: Dispatch;
  getState: () => AppState & ApplicationState;
  subscribe: any;
  replaceReducer: any;
  [prop: string]: any;
  // to allow us to add other keys if needed
}
