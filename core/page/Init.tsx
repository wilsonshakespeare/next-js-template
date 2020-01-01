import React from 'react';
import ApplicationStore from '../utils/app-store';
import { PageContext, InitDelegator } from '../definitions/Page.d';
import { StoreType } from '../definitions/Application.d';

export default function getInitComponent<PropType, AppState>(
  storeInstance: ApplicationStore<AppState>,
  delegator: InitDelegator<PropType, PageContext<AppState>>
) {
  return class Init extends React.Component<PropType & { store: StoreType<AppState> }> {
    public static async getInitialProps(context: PageContext<AppState>) {
      // To send necessary page props and App Level redux dispatch
      const { req, isServer, asPath } = context;

      const hostname = req ? req.hostname : window.location.hostname;
      const protocol = req ? req.protocol : window.location.protocol;

      return {
        isServer,
        hostname,
        protocol,
        asPath,
        ...(await delegator.getInitialProps(context)),
      };
    }

    public componentDidMount() {
      // For client side singleton initialization
      const { store } = this.props;
      storeInstance.setStore(store);
      delegator.componentDidMount(this.props);
    }

    public render() {
      return <React.Fragment />;
    }
  };
}
