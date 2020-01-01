import React from 'react';
import RenderComposite from './RenderComposite';

export default abstract class RendererStrategyBase<P> {
  // Rendering of the component itself
  private _isBreakRender: boolean;
  private _name: string;
  protected constructor(name: string, isBreakRender: boolean) {
    this._name = name;
    this._isBreakRender = isBreakRender;
  }

  public abstract render(
    key: string,
    renderProps: P,
    children: Array<RenderComposite<any>>
  ): React.ReactNode;
  // Meaning if the condition of the Rendering is Met it will render
  public abstract isRenderConditionMet(renderProps: P): boolean;
  // Meaning Stop Rendering The Children
  public get isBreakRender(): boolean {
    return this._isBreakRender;
  }
  // Meaning Stop Rendering The Children
  public get name(): string {
    return this._name;
  }
  // Render The Children
  protected renderChildren(children: Array<RenderComposite<any>>): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    for (const child of children) {
      if (child.isRenderConditionMet()) {
        nodes.push(child.render());
        if (child.renderStrategy.isBreakRender) {
          break;
        }
      }
    }
    return nodes;
  }
}
