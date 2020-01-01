import { ApplicationState } from '@definitions/Application.d';

export const getPrevPathname = ({ path }: ApplicationState) => path.prevPathname;
export const getCurrPathname = ({ path }: ApplicationState) => path.currPathname;
export const getPath = ({ path }: ApplicationState) => path;
