import { Server } from "@overnightjs/core";
import { Application } from "express-serve-static-core";
import { APIController } from "./controllers/interfaces";
export declare const BIND_CONTROLLERS = "controllers";
export declare class ExampleServer extends Server {
    private readonly SERVER_STARTED;
    private readonly logger;
    private readonly http;
    private readonly shutdown;
    constructor(controllers: APIController[]);
    private setupControllers;
    express(): Application;
    stop(): void;
    start(port: number): void;
}
