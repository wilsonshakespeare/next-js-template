import { Request, Response } from 'express';
import { Server } from 'next';
import { SsrMiddleware } from '../definitions/Server';

class Renderer<MiddlewareValues = {}, MiddlewareOptions = {}> {
  public app: Server;
  public ssrMiddleware?: SsrMiddleware<MiddlewareValues, MiddlewareOptions>;
  public enableCache: boolean;

  constructor(
    app: Server,
    ssrMiddleware?: SsrMiddleware<MiddlewareValues, MiddlewareOptions>
  ) {
    this.app = app;
    this.ssrMiddleware = ssrMiddleware;
    this.enableCache = process.env.ENABLE_SSR_CACHE
      ? /^TRUE$/i.test(process.env.ENABLE_SSR_CACHE)
      : false;
  }

  public async serve(
    req: Request,
    res: Response,
    pagePath: string,
    queryParams?: any,
    options?: MiddlewareOptions
  ) {
    let query: any = {};
    try {
      const ssrValues = this.ssrMiddleware
        ? await this.ssrMiddleware(req, res, options)
        : {};

      query = {
        ...queryParams,
        ...ssrValues
      };
    } catch (err) {
      this.app.renderError(err, req, res, pagePath, queryParams);
      return;
    }

    try {
      const html: string = await this.app.renderToHTML(
        req,
        res,
        pagePath,
        query
      );

      res.send(html);
    } catch (err) {
      this.app.renderError(err, req, res, pagePath, query);
    }
  }
}

export default Renderer;
