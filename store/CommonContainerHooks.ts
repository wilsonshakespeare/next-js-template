// For commonly used props, Example: isLogin, config, and etc. instead of whole store
// Easier for user to onboard without knowing the module path
import { CommonHooksOption, CommonHooksProps } from '@definitions/Application.d';
import { useSelector } from '@core/utils/redux';
import useContainerBase, {
  defaultOption as defaultOptionBase,
} from '@core/modules/CommonContainerHooks';
import { getConfig } from './modules/config/selectors';

// Options append may not be the most optimized but it is the most reusable way
export const defaultOption: CommonHooksOption = {
  // Most components need config for theming
  ...defaultOptionBase,
  hasConfig: true,
};

export default function useContainer(opt?: CommonHooksOption): CommonHooksProps {
  const option: CommonHooksOption = {
    ...defaultOption,
    ...opt,
  };

  return {
    ...useContainerBase(option),
    ...(option.hasConfig ? { config: useSelector(getConfig) } : {}),
  };
}
