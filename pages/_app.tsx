import '../styles/main.scss';

import withRedux from 'next-redux-wrapper';
import React from 'react';
import { PageContext } from '@definitions/Application.d';
import configuredStore from '@store/store';
import App, { Container, NextAppContext } from 'next/app';
import { Provider } from 'react-redux';
import AppContext from '@core/context';
import Init from './_init';
import { IProps } from './_init/index.d';

class ProjectApp extends App<IProps> {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    const props = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {
      pageProps: {
        ...props,
        // No Custom NextContext Available
        ...(await Init.getInitialProps(ctx as PageContext)),
      },
    };
  }

  public render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        {/** Client Side Init Only */}
        <Init store={store} />
        <Provider
          // @ts-ignore store not recognised by react-redux Provider
          store={store}
          context={AppContext}
        >
          <Component {...pageProps} context={AppContext} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configuredStore)(ProjectApp);
