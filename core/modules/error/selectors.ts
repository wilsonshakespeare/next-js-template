import _ from 'lodash';
import { ApplicationState } from '../../definitions/Application.d';
import { ErrorModuleItem } from './typings';

export function getErrorByDisplayKey({
  error: { displayKey, errors },
}: ApplicationState): ErrorModuleItem {
  if (_.isEmpty(errors)) {
    return null;
  }
  return errors.find(value => value.displayKey === displayKey);
}

export function getErrorByRequestName(
  { error: { errors } }: ApplicationState,
  requestName: string
) {
  if (_.isEmpty(errors)) {
    return {};
  }
  return errors.find(value => value.requestName === requestName);
}
