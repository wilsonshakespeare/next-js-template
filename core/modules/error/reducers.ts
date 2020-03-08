import initialState from './initial-state';
import { RESET_ERROR_STATE } from './action-types';
import { ReducerFunction } from './typings.d';
import cloneDeep from 'lodash/cloneDeep';

export const reducer: ReducerFunction = (state = initialState, action) => {
  const { type, payload } = action;
  // Any Actions String That Matches _FAILURE will be processed for error state
  // Example: PRODUCT_SEARCH_FAILURE action -> will be processed by error reducer
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // No matches of _FAILURE or _REQUEST only process the following
  if (!matches) {
    switch (type) {
      case RESET_ERROR_STATE:
        return {
          ...initialState,
        };
      default:
        return state;
    }
  }

  const [, requestName, requestState] = matches;
  // `errors` will not trigger re-render, because object is the same
  // if on page, would get error message by request name, that will trigger rerender
  // displayKey is handled at PageBase

  const errors = cloneDeep(state.errors);
  const displayKey = payload.displayKey ? { displayKey: payload.displayKey } : {};

  if (requestState === 'FAILURE') {
    errors.push({
      ...displayKey,
      requestName,
      code: payload.code,
      status: payload.status,
      message: payload.message,
    });
  }

  const update = {
    ...(payload.displayKey ? { displayKey: payload.displayKey } : {}),
    errors,
  };

  return {
    ...state,
    ...update,
  };
};

export default reducer;
