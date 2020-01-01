import React from 'react';
import BaseRenderStrategy from '@core/page/RendererStrategyBase';
import RenderComposite from '@core/page/RenderComposite';
import Layout, { LayoutProps } from '@components/Layout/Layout';

export default class LayoutRenderer extends BaseRenderStrategy<LayoutProps> {
  public static getInstance(): LayoutRenderer {
    if (!LayoutRenderer.instance) {
      LayoutRenderer.instance = new LayoutRenderer();
    }
    return LayoutRenderer.instance;
  }

  private static instance: LayoutRenderer;
  private constructor() {
    super('layout', false);
  }

  // Rendering of the component itself
  public render(
    key: string,
    renderProps: LayoutProps,
    children: Array<RenderComposite<any>>
  ): React.ReactNode {
    return (
      <Layout key={key} {...renderProps}>
        {this.renderChildren(children)}
      </Layout>
    );
  }
  // Meaning if the condition of the Rendering is Met it will render
  // Meaning Stop Rendering The Children

  public isRenderConditionMet(renderProps: LayoutProps): boolean {
    // Use utils to check is empty or null
    if (renderProps && renderProps.title) {
      return true;
    }
    return false;
  }
}
