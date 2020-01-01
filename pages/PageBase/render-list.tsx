import React, { ReactNode } from 'react';
import Renderers from './renderers';
import RenderComposite from '@core/page/RenderComposite';
import { PageHooksProps, PageViewOptions } from '@definitions/index.d';

export default function render(
  page: ReactNode,
  props: PageHooksProps & { pageOption: PageViewOptions }
): React.ReactNode {
  const layout = new RenderComposite(Renderers.LayoutRenderer, {
    config: props.config,
    title: props.pageOption.title,
  });
  // lingui js provider and other context required
  layout.add(new RenderComposite(Renderers.JSXRenderer, props.config));
  layout.add(new RenderComposite(Renderers.PageRenderer, page));
  return <React.Fragment>{layout.render()}</React.Fragment>;
}
