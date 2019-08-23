/// <reference types="node" />
import { NextFunction, Request, Response } from "express";
import * as http from "http";
export declare class Shutdown {
    private _shutdown;
    private listener;
    constructor(listener: http.Server);
    shutdown(onReady?: () => void): void;
    middleware: (req: Request, res: Response, next: NextFunction) => void;
}
