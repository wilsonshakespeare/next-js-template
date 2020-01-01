import { Express } from 'express';
import { RouteModel, RouteAsyncModel } from './index';

export class RouteModule {
  public static addRoute(server: Express, route: RouteAsyncModel | RouteModel) {
    switch (route.method) {
      case 'PUT':
        server.put(route.path, route.renderFunction);
      case 'GET':
        server.get(route.path, route.renderFunction);
      case 'POST':
        server.post(route.path, route.renderFunction);
      case 'DELETE':
        server.delete(route.path, route.renderFunction);
    }
  }

  private routeMap: RouteModel[] = [];
  private routeAsyncMap: RouteAsyncModel[] = [];

  public addRoute(routeModel: RouteModel) {
    this.routeMap.push(routeModel);
  }

  public addRouteAsync(routeModel: RouteAsyncModel) {
    this.routeAsyncMap.push(routeModel);
  }

  public setupServer(server: Express) {
    this.routeMap.forEach(route => RouteModule.addRoute(server, route));
    this.routeAsyncMap.forEach(route => RouteModule.addRoute(server, route));
  }
}

export default RouteModule;
