// For commonly used props, Example: isLogin, config, and etc. instead of whole store
// Easier for user to onboard without knowing the module path
import { CommonHooksOption, CommonHooksProps } from '../definitions/Application.d';
import { useSelector } from '../utils/redux';

import { getErrorByDisplayKey } from './error/selectors';
import { getPath } from './path/selectors';

export const defaultOption: CommonHooksOption = {
  // Most components need config for theming
  hasError: false,
  hasPath: false,
};

export default function useContainer(opt?: CommonHooksOption): CommonHooksProps {
  const option: CommonHooksOption = {
    ...defaultOption,
    ...opt,
  };

  return {
    ...(option.hasPath ? { path: useSelector(getPath) } : {}),
    ...(option.hasError ? { error: useSelector(getErrorByDisplayKey) } : {}),
  };
}
