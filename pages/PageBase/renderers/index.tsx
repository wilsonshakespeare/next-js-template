import LayoutRenderer from './LayoutRenderer';
import JSXRenderer from './JsxRenderer';
import PageRenderer from './PageRenderer';

export default {
  LayoutRenderer: LayoutRenderer.getInstance(),
  JSXRenderer: JSXRenderer.getInstance(),
  PageRenderer: PageRenderer.getInstance(),
};
