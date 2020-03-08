import React from 'react';
import { ViewProps } from './index.d';
import BaseView, { ViewProps as BaseViewProps } from '../PageBase/View';
// @ts-ignore For Demo
function HomeView({ containerValues }: ViewProps) {
  const { config } = containerValues;
  const baseProps: BaseViewProps = {
    ...containerValues,
    pageOption: {
      title: 'Home',
    },
  };
  return (
    <BaseView {...baseProps}>
      {`
          Proving Page Container Hooks Concept
          Work: Company Name is ${config.branding.companyName}
        `}
      <br />
      <button className="button button--secondary button--with-border-radius">
        <b>Test</b>
      </button>
    </BaseView>
  );
}

export default HomeView;
