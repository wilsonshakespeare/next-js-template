import { Express } from 'express';
// this should initialize the server at core
import ServerBase from '../core/server/server';
import PageRoutes from './routes/PageRoutes';
import { MiddlewareValues } from './ssr-middleware/index.d';
import ssrMiddleware from './ssr-middleware';

export class Server extends ServerBase<MiddlewareValues> {
  // Must be Singleton
  public static getInstance(): Server {
    if (!Server._instance) {
      Server._instance = new Server();
    }
    return Server._instance;
  }
  private static _instance: Server = null;

  private constructor() {
    // pass hasServiceWorker or SSR Middleware
    super(false, ssrMiddleware);
  }
  // @ts-ignore because doing nothing
  protected setupMiddlewares(server: Express) {
    // setup your own middleware -> server.use
  }

  // @ts-ignore because doing nothing
  protected setupSettings(server: Express) {
    // setup your own settings -> server.set
  }

  protected setupRoutes(server: Express) {
    // Setup the routes
    PageRoutes.setupServer(server);
  }
}

export default Server;
