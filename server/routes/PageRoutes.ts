import { RouteModule, RouteModel } from '../../core/server/router';
import { Request, Response } from 'express';
import { Server } from '../server';

export class PageRoutes extends RouteModule {
  // Optionally Singleton
  public static getInstance(): PageRoutes {
    if (!PageRoutes._instance) {
      PageRoutes._instance = new PageRoutes();
    }
    return PageRoutes._instance;
  }

  public static pageRender(path: string) {
    return (req: Request, res: Response) => {
      Server.getInstance().renderer.serve(req, res, path);
    };
  }

  private static _instance: PageRoutes = null;
  private constructor() {
    super();
    this.addRoute(new RouteModel('GET', '/', PageRoutes.pageRender('/Home')));
    // this.addRoute(new RouteModel('GET', '/movie/:id', PageRoutes.pageRender('/Movie')));
  }
}

export default PageRoutes.getInstance();
