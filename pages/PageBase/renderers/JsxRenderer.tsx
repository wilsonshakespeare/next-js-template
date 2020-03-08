import React, { Fragment } from 'react';
import { Config } from '@definitions/index.d';
import BaseRenderStrategy from '@core/page/RendererStrategyBase';
import RenderComposite from '@core/page/RenderComposite';
import isEmpty from 'lodash/isEmpty';

function JsxStyles({ config }: { config: Config }) {
  const { theme } = config;
  return (
    // @ts-ignore style jsx cause linting error
    <style jsx global>{`
      ::selection {
        color: ${theme.primaryColorText};
        background: ${theme.primaryColor};
      }
      .button {
        background: ${theme.primaryColor};
        color: ${theme.primaryColorText};
        border-color: ${theme.primaryColorText};
      }
      .button:hover {
        background: ${theme.primaryColorHover};
        color: ${theme.primaryColorText};
      }
      .button:active,
      .button:focus {
        background: ${theme.primaryColorActive};
        color: ${theme.primaryColorText};
      }
    `}</style>
  );
}

export default class JSXRenderer extends BaseRenderStrategy<Config> {
  public static getInstance(): JSXRenderer {
    if (!JSXRenderer.instance) {
      JSXRenderer.instance = new JSXRenderer();
    }
    return JSXRenderer.instance;
  }

  private static instance: JSXRenderer;
  private constructor() {
    super('jsx-list', false);
  }

  public render(
    key: string,
    config: Config,
    // @ts-ignore template reason
    children: Array<RenderComposite<any>>
  ): React.ReactNode {
    return (
      <Fragment key={key}>
        <JsxStyles config={config} />
      </Fragment>
    ); // Set the JSX here based on Config
  }
  // Meaning if the condition of the Rendering is Met it will render
  // Meaning Stop Rendering The Children

  public isRenderConditionMet(config: Config): boolean {
    return !isEmpty(config);
  }
}
