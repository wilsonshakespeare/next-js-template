import { RouteAsyncFunction } from './index';
import { HTTP_METHOD } from '../../definitions/Http';
import asyncHandler from 'express-async-handler';

export class RouteAsyncModel {
  public method: HTTP_METHOD;
  public path: string;
  public renderFunction: RouteAsyncFunction;

  constructor(
    method: HTTP_METHOD,
    path: string,
    renderFunction: RouteAsyncFunction
  ) {
    this.method = method;
    this.path = path;
    this.renderFunction = asyncHandler(renderFunction);
  }
}

export default RouteAsyncModel;
