import { PageContext } from '@definitions/Application.d';
import { IProps } from './index.d';
import { setConfig } from '@store/modules/config/actions';
import { InitDelegator } from '@core/definitions/Page';

export async function getInitialProps(context: PageContext) {
  /**
   * This is meant for app level getInitialProps, so the props will be passed to all pages
   * It is also to trigger necessary App Level redux dispatch
   */

  // This is required as for now config cannot be handled at store
  const { isServer, query, store } = context;
  if (isServer && query.config) {
    store.dispatch(setConfig(query.config));
  }

  return {};
}

// @ts-ignore This is meant for custom template for user
export async function componentDidMount(props: IProps) {
  /**
   * This is meant for app level singleton initialization
   */
}

const object: InitDelegator<IProps, PageContext> = {
  getInitialProps,
  componentDidMount,
};

export default object;
