import React, { Fragment } from 'react';
import { ViewProps } from './View.d';
import { PageViewOptions } from '@definitions/PageBase.d';
import RenderFunction from './render-list';

export { ViewProps } from './View.d';

const defaultPageOption: PageViewOptions = {
  title: 'Welcome',
};

// Note, cannot be HOC because depended on the container hooks values
const View: React.FC<ViewProps> = props => {
  const viewProps = {
    ...props,
    pageOption: {
      ...defaultPageOption,
      ...props.pageOption,
    },
  };
  return <Fragment>{RenderFunction(props.children, viewProps)}</Fragment>;
};

export default View;
