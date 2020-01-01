import React from 'react';
import BaseRenderStrategy from '@core/page/RendererStrategyBase';
import RenderComposite from '@core/page/RenderComposite';
import { isEmpty } from 'lodash';

export default class PageRenderer extends BaseRenderStrategy<React.ReactNode> {
  public static getInstance(): PageRenderer {
    if (!PageRenderer.instance) {
      PageRenderer.instance = new PageRenderer();
    }
    return PageRenderer.instance;
  }

  private static instance: PageRenderer;
  private constructor() {
    super('page', false);
  }

  // Rendering of the component itself
  public render(
    key: string,
    renderProps: React.ReactNode,
    // @ts-ignore template reason
    children: Array<RenderComposite<any>>
  ): React.ReactNode {
    return <React.Fragment key={key}>{renderProps}</React.Fragment>;
  }

  // Meaning if the condition of the Rendering is Met it will render
  // Meaning Stop Rendering The Children
  public isRenderConditionMet(renderProps: React.ReactNode): boolean {
    return !isEmpty(renderProps);
  }
}
