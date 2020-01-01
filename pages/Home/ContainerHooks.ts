import { ContainerHooksProps } from './index.d';
import useContainerBase from '../PageBase/ContainerHooks';
export default function useContainer(): ContainerHooksProps {
  return {
    ...useContainerBase(),
  };
}
