// For commonly used props, Example: isLogin, config, and etc. instead of whole store
// Easier for user to onboard without knowing the module path
// @ts-ignore For template purpose
import { useSelector } from '@core/utils/redux';
import { PageHooksOptions, PageHooksProps } from '@definitions/PageBase.d';
import useContainerBase, { defaultOption as defaultOptionBase } from '@store/CommonContainerHooks';

// Options append may not be the most optimized but it is the most reusable way
const defaultOption: PageHooksOptions = {
  // Most components need config for theming
  ...defaultOptionBase,
  hasError: true,
  hasPath: true,
};

export default function useContainer(opt?: PageHooksOptions): PageHooksProps {
  const option: PageHooksOptions = {
    ...defaultOption,
    ...opt,
  };

  return {
    ...useContainerBase(option),
  };
}
