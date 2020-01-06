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
      <div className="container">{`
        Proving Page Container Hooks Concept
        Work: Company Name is ${config.branding.companyName}
      `}</div>
    </BaseView>
  );
}

export default HomeView;
