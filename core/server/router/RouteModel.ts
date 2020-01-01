import { RouteFunction } from './index';
import { HTTP_METHOD } from '../../definitions/Http';

export class RouteModel {
  public method: HTTP_METHOD;
  public path: string;
  public renderFunction: RouteFunction;

  constructor(
    method: HTTP_METHOD,
    path: string,
    renderFunction: RouteFunction
  ) {
    this.method = method;
    this.path = path;
    this.renderFunction = renderFunction;
  }
}

export default RouteModel;
