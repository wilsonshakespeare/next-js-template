import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import express, { Request, Response, Express } from 'express';
import next, { Server as NextServer } from 'next';
import { UrlWithParsedQuery } from 'url';
import { createReadStream } from 'fs';
import { SsrMiddleware } from '../definitions/Server.d';
import Renderer from './renderer';

export abstract class Server<MiddlewareValues = {}, MiddlewareOption = {}> {
  public renderer: Renderer<MiddlewareValues, MiddlewareOption>;
  public app: NextServer;
  protected hasServiceWorker: boolean;
  protected ssrMiddleware: SsrMiddleware<MiddlewareValues, MiddlewareOption>;
  private _isDev: boolean;
  private _environment: string;

  constructor(
    hasServiceWorker: boolean = false,
    ssrMiddleware: SsrMiddleware<MiddlewareValues, MiddlewareOption> = null
  ) {
    dotenv.config();
    this._environment = process.env.ENVIRONMENT || 'development';
    this._isDev = this.environment !== 'production';
    this.app = next({ dev: this._isDev });
    this.renderer = new Renderer(this.app, ssrMiddleware);
    this.hasServiceWorker = hasServiceWorker;
    this.ssrMiddleware = ssrMiddleware;
  }

  public get environment() {
    return this._environment;
  }

  public async start() {
    // Initialize Variables

    const defaultHandler: (
      req: Request,
      res: Response,
      parsedUrl?: UrlWithParsedQuery
    ) => Promise<void> = this.app.getRequestHandler();

    if (this._isDev) {
      await this.app.prepare();
    }

    // Start Express Server
    const server = express();

    // To allow the cookie to be accessible in getInitialProps as req.cookies
    server.use(cookieParser());

    // To allow the express to parse JSON request body
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    this.setupMiddlewares(server);

    // To allow the express to render EJS view templates
    server.set('views', path.join(`${process.cwd()}/views`));
    server.set('view engine', 'ejs');
    this.setupSettings(server);

    this.setupRoutes(server);

    // Service worker
    if (this.hasServiceWorker) {
      // @ts-ignore req is not needed
      server.get('/service-worker.js', (req, res) => {
        res.setHeader('Content-Type', 'text/javascript');
        createReadStream('./service-worker.js').pipe(res);
      });
    }

    // Handles health check end point
    // @ts-ignore req is not needed
    server.get('/health-check', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("<!DOCTYPE html><html><body>I'm Healthy</body></html>");
      res.end();
    });

    // handle the rest of the routes
    server.get(
      '*',
      asyncHandler(async (req, res) => {
        // check if configuration needed and other ssr values needed
        if (
          !(
            req.path.startsWith('/static') ||
            req.path.startsWith('/_next') ||
            req.path.startsWith('/favicon.ico')
          )
        ) {
          // process ssrMiddleware for none static request:
          // Example: page not found might required theme config
          // Based on experience on doing whitelabelling
          const ssrValues = this.ssrMiddleware ? await this.ssrMiddleware(req, res) : {};
          req.query = {
            ...req.query,
            ...ssrValues,
          };
        }
        defaultHandler(req, res).catch(e => {
          // use rejected promise to forward error to next express middleware
          next(e);
        });
      })
    );

    // start the server
    const port = process.env.PORT || 2000;
    // @ts-ignore
    server.listen(port, error => {
      if (error) throw error;
      console.log(`Server (${this.environment}) listening to port ${port}`);
    });
  }

  protected abstract setupMiddlewares(server: Express);

  protected abstract setupSettings(server: Express);

  protected abstract setupRoutes(server: Express);
}

export default Server;
