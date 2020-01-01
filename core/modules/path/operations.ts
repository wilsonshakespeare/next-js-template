import { ApplicationState } from '@definitions/Application.d';
import { Dispatch } from 'redux';
import { getPrevPathname, getCurrPathname } from './selectors';
import actions from './actions';

export const updateCurrentPathname = (pathname: string) => (
  state: ApplicationState,
  dispatch: Dispatch
) => {
  const currentPathname = getCurrPathname(state);

  if (currentPathname !== getPrevPathname(state)) {
    // if different only update the previous pathname
    // Logic: taking the current pathname update to prev pathname
    dispatch(actions.setPreviousPathname(currentPathname));
  }

  if (currentPathname !== pathname) {
    // if different only update the current pathname
    // Logic: update the most recent pathname
    dispatch(actions.setCurrentPathname(pathname));
  }
};

export function isPrevAndCurrPathnameSame(state: ApplicationState) {
  return getPrevPathname(state) === getCurrPathname(state);
}
