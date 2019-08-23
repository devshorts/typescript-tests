import { NextFunction, Request, Response } from "express";
export declare function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void;
