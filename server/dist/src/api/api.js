"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const log_1 = require("../util/logger/log");
const core_1 = require("@overnightjs/core");
const inversify_1 = require("inversify");
const trace_1 = require("./middleware/trace");
const errors_1 = require("./middleware/errors");
const http = require("http");
const shutdown_1 = require("./middleware/shutdown");
const timing_1 = require("./middleware/timing");
const bodyParser = require("body-parser");
const getEndpoints = require("express-list-endpoints");
exports.BIND_CONTROLLERS = "controllers";
let ExampleServer = class ExampleServer extends core_1.Server {
    constructor(controllers) {
        super(false);
        this.SERVER_STARTED = 'Example server started on port: ';
        this.http = http.createServer(this.app);
        this.logger = log_1.log;
        this.shutdown = new shutdown_1.Shutdown(this.http);
        this.app.use(this.shutdown.middleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(trace_1.traceMiddleware);
        this.app.use(timing_1.timingMiddleware);
        this.setupControllers(controllers);
        this.app.use(errors_1.errorHandlerMiddleware);
    }
    setupControllers(controllers) {
        for (const controller of controllers) {
            super.addControllers(controller);
        }
    }
    express() {
        return this.app;
    }
    stop() {
        this.shutdown.shutdown();
    }
    start(port) {
        for (const listEndpoint of getEndpoints(this.app)) {
            for (const method of listEndpoint.methods) {
                log_1.log.info(`${method}:    ${listEndpoint.path}`);
            }
        }
        this.http.listen(port, () => {
            this.logger.info(this.SERVER_STARTED + port);
        });
    }
};
ExampleServer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.multiInject(exports.BIND_CONTROLLERS)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ExampleServer);
exports.ExampleServer = ExampleServer;
//# sourceMappingURL=api.js.map