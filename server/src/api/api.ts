import {log, Logger} from "../util/logger/log";
import {Server} from "@overnightjs/core";
import {Controller} from "./controllers/hello";
import {injectable, multiInject} from "inversify";
import {traceMiddleware} from "./middleware/trace";
import {errorHandlerMiddleware} from "./middleware/errors";
import bodyParser = require("body-parser");
import getEndpoints = require("express-list-endpoints");
import {Application} from "express";

export const BIND_CONTROLLERS = "controllers";

@injectable()
export class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';
    private logger: Logger;

    constructor(@multiInject(BIND_CONTROLLERS) controllers: Controller[]) {
        super(false);
        this.logger = log;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(traceMiddleware);
        this.setupControllers(controllers);
        this.app.use(errorHandlerMiddleware);
    }

    private setupControllers(controllers: Controller[]): void {
        for (const controller of controllers) {
            super.addControllers(controller);
        }
    }

    express(): Application {
        return this.app
    }

    start(port: number): void {
        for (const listEndpoint of getEndpoints(this.app)) {
            for (const method of listEndpoint.methods) {
                log.info(`${method}:    ${listEndpoint.path}`)
            }
        }

        this.app.listen(port, () => {
            this.logger.info(this.SERVER_STARTED + port);
        });
    }
}
