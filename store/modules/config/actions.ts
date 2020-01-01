// @flow
import { Config } from './typings.d';
import actionTypes from './action-types';

export function setConfig(data: Config) {
  return {
    type: actionTypes.SET_CONFIG,
    payload: {
      config: data,
    },
  };
}
