import React, { Fragment } from 'react';
import { LayoutProps } from './Layout.d';
export { LayoutProps } from './Layout.d';
import Head from 'next/head';
import SeoOgKeys from '@constants/seo-og-keys';

// Add Header and Footer Here
const Layout: React.FC<LayoutProps> = ({ config, title, children }) => {
  return (
    <Fragment>
      <Head>
        {title && title !== SeoOgKeys.CUSTOM_TITLE_FLAG && (
          <title>{`${config.branding.companyName} | ${title}`}</title>
        )}
      </Head>
      {children}
    </Fragment>
  );
};

export default Layout;
