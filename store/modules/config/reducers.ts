// @flow
import { Config, ReducerFunction } from './typings.d';
import actionTypes from './action-types';
import initialState from './initial-state';

// Use @ts-ignore when cannot set default initial state. Because using fs for test footer.html
const reducer: ReducerFunction = (state: Config = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_CONFIG:
      return {
        ...state,
        ...action.payload.config,
      };
    default:
      return state;
  }
};

export default reducer;
