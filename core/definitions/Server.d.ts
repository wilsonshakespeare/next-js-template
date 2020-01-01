import { Request, Response } from 'express';

export type SsrMiddleware<MiddlewareValues, MiddlewareOptions = {}> = (
  req: Request,
  res: Response,
  options?: MiddlewareOptions
) => Promise<MiddlewareValues>;
