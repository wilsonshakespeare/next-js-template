import { SET_CURR_PATHNAME, SET_PREV_PATHNAME } from './action-types';

export const setCurrentPathname = (payload: string) => ({
  payload,
  type: SET_CURR_PATHNAME,
});

export const setPreviousPathname = (payload: string) => ({
  payload,
  type: SET_PREV_PATHNAME,
});

// TODO: use action creator but need to update it with intellisense
export default {
  setCurrentPathname,
  setPreviousPathname,
};
