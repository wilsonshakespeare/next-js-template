import React from 'react';
import flush from 'styled-jsx/server';
import Logger from '@core/utils/logger';
import { Config } from '@store/modules/typings.d';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';

export default class AppDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    // @TODO <html lang="{locale}"> when integrated with lingui js and path prefix mechanism
    const style = flush(); // SSR styles

    // @ts-ignore Getting the store
    const store = this.props.__NEXT_DATA__.props.store;
    const config: Config = store ? store.getState().config : null;

    try {
      return (
        <html lang="en">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no,
            user-scalable=no, viewport-fit=cover, maximum-scale=1.0, user-scalable=0"
            />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content={config.theme.primaryColor} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Asap:400,500,600,700&display=swap"
            />
            <link href={config.branding.favicon} rel="shortcut icon" />
            {style}
          </Head>
          <body className="custom_class">
            <Main />
            <NextScript />
          </body>
        </html>
      );
    } catch (exp) {
      // Check For Render errors
      Logger.console_log('Render Error:', { exp });
      return <html>Invalid Page</html>;
    }
  }
}
