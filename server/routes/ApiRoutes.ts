import { RouteModule, RouteAsyncModel } from '../../core/server/router';
import { Request, Response } from 'express';

export class ApiRoutes extends RouteModule {
  // Optionally Singleton
  public static getInstance(): ApiRoutes {
    if (!ApiRoutes._instance) {
      ApiRoutes._instance = new ApiRoutes();
    }
    return ApiRoutes._instance;
  }

  private static _instance: ApiRoutes = null;
  private constructor() {
    super();
    this.addRoute(new RouteAsyncModel('GET', '/api/search-movie', this.searchMovie));
  }

  public async searchMovie(req: Request, res: Response) {
    // Will Change This to API Call
    if (!req.body.name || req.body.name.length === 0) return res.sendStatus(400);
    const content = req.cookies[req.body.name] || null;
    return res.status(200).send(content);
  }
}

export default ApiRoutes.getInstance();
