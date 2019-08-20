import {log, Logger} from "../util/logger/log";
import {Server} from "@overnightjs/core";
import {Controller} from "./controllers/hello";
import {injectable, multiInject} from "inversify";
import bodyParser = require("body-parser");

export const BIND_CONTROLLERS = "controllers"

@injectable()
export class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';
    private logger: Logger;

    constructor(@multiInject(BIND_CONTROLLERS) controllers: Controller[]) {
        super(true);
        this.logger = log;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        // this.app.use(traceMiddleware)
        this.setupControllers(controllers);
    }

    private setupControllers(controllers: Controller[]): void {
        for (const controller of controllers) {
            super.addControllers(controller);
        }
    }

    start(port: number): void {
        this.app.listen(port, () => {
            this.logger.info(this.SERVER_STARTED + port);
        });
    }
}
