import { Request, Response } from 'express';

export type RouteFunction = (req: Request, res: Response, next?: any) => void;
export type RouteAsyncFunction = (req: Request, res: Response, next?: any) => Promise<Response>;

export * from './RouteModel';
export * from './RouteAsyncModel';
export * from './RouteModule';
