import React from 'react';
import RendererStrategyBase from './RendererStrategyBase';
import { console_log, Severity } from '../utils/logger';

export default class RenderComposite<P> {
  // RenderComposite stores the render data to be passed to RenderStrategy to Render
  // Purpose is to reuse the RenderStrategy Singleton to Save Memory
  private _parent: RenderComposite<any> = null;
  private _children: Array<RenderComposite<any>> = [];
  private _rendererStrategy: RendererStrategyBase<P>;
  private _renderProps: P;
  private _index: number = 0;

  constructor(rendererStrategy: RendererStrategyBase<P>, renderProps: P) {
    this._rendererStrategy = rendererStrategy;
    this._renderProps = renderProps;
  }

  public get children(): Array<RenderComposite<any>> {
    return this._children;
  }

  public get parent(): RenderComposite<any> {
    return this._parent;
  }

  public setParent<R>(parent: RenderComposite<R>) {
    if (this._parent !== null) {
      // TODO: use console utils
      console_log('Warning: Parent is Set', {}, {}, Severity.WARNING);
    }
    this._index = this._children.length;
    this._parent = parent;
  }

  public add<R>(composite: RenderComposite<R>) {
    if (composite.parent) {
      console_log('Warning: Parent is Set', {}, {}, Severity.WARNING);
      return;
    }

    composite.setParent(this);
    this._children.push(composite);
  }

  public render(): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];

    if (this._rendererStrategy.isRenderConditionMet(this._renderProps)) {
      // if render condition meet render the parent, if not render the children
      nodes.push(this._rendererStrategy.render(this.getKey(), this._renderProps, this._children));
    } else {
      for (const child of this._children) {
        if (child.isRenderConditionMet()) {
          nodes.push(child.render());
          if (child.renderStrategy.isBreakRender) {
            break;
          }
        }
      }
    }

    return nodes;
  }

  public isRenderConditionMet(): boolean {
    return this._rendererStrategy.isRenderConditionMet(this._renderProps);
  }

  public getKey(): string {
    // Because of recursive parent call the key will never be the same
    if (this._parent === null) {
      return `${this._rendererStrategy.name}-0`;
    }
    return `${this._parent.getKey()}.${this._rendererStrategy.name}-${this._index}`;
  }

  public get renderStrategy(): RendererStrategyBase<P> {
    return this._rendererStrategy;
  }

  public get renderProps(): P {
    return this._renderProps;
  }

  public get index(): number {
    return this._index;
  }
}
