import initialState from './initial-state';
import { SET_CURR_PATHNAME, SET_PREV_PATHNAME } from './action-types';
import { ReducerFunction } from './typings.d';

const reducer: ReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURR_PATHNAME:
      return { ...state, currPathname: action.payload };
    case SET_PREV_PATHNAME:
      return { ...state, prevPathname: action.payload };
    default:
      return state;
  }
};

export default reducer;
