// Important Note:
// Index link both View and Hooks
import React from 'react';

import HomeView from './View';
import useContainer from './ContainerHooks';
import { PageProps, ViewProps } from './index.d';

function Index(props: PageProps) {
  const containerValues = useContainer();

  const viewProps: ViewProps = {
    ...props,
    containerValues,
  };

  return <HomeView {...viewProps} />;
}

export default Index;
