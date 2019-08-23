import {log, Logger} from "../util/logger/log";
import {Server} from "@overnightjs/core";
import {injectable, multiInject} from "inversify";
import {traceMiddleware} from "./middleware/trace";
import {errorHandlerMiddleware} from "./middleware/errors";
import * as http from "http";
import {Shutdown} from "./middleware/shutdown";
import {Application} from "express-serve-static-core";
import {timingMiddleware} from "./middleware/timing";
import {APIController} from "./controllers/interfaces";
import bodyParser = require("body-parser");
import getEndpoints = require("express-list-endpoints");

export const BIND_CONTROLLERS = "controllers";

@injectable()
export class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';
    private readonly logger: Logger;
    private readonly http: http.Server;
    private readonly shutdown: Shutdown;

    constructor(@multiInject(BIND_CONTROLLERS) controllers: APIController[]) {
        super(false);
        this.http = http.createServer(this.app);
        this.logger = log;
        this.shutdown = new Shutdown(this.http);
        this.app.use(this.shutdown.middleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(traceMiddleware);
        this.app.use(timingMiddleware);
        this.setupControllers(controllers);
        this.app.use(errorHandlerMiddleware);
    }

    private setupControllers(controllers: APIController[]): void {
        for (const controller of controllers) {
            super.addControllers(controller);
        }
    }

    express(): Application {
        return this.app
    }

    stop(): void {
        this.shutdown.shutdown()
    }

    start(port: number): void {
        for (const listEndpoint of getEndpoints(this.app)) {
            for (const method of listEndpoint.methods) {
                log.info(`${method}:    ${listEndpoint.path}`)
            }
        }

        this.http.listen(port, () => {
            this.logger.info(this.SERVER_STARTED + port);
        });
    }
}
