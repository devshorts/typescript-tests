"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const log_1 = require("./util/logger/log");
const inversify_1 = require("inversify");
const api_1 = require("./api/api");
const kernel_1 = require("./modules/kernel");
const pubsub_1 = require("./queue/pubsub");
const loader_1 = require("./config/loader");
let App = class App {
    constructor(server, consumer) {
        this.server = server;
        this.consumer = consumer;
        process.once('SIGINT', () => {
            log_1.log.info('SIGINT received...');
            this.close();
        });
    }
    run() {
        log_1.log.info("app starting");
        this.server.start(9090);
        return;
    }
    close() {
        this.server.stop();
    }
};
App = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(1, inversify_1.inject("sqs_consumer")),
    tslib_1.__metadata("design:paramtypes", [api_1.ExampleServer,
        pubsub_1.Consumer])
], App);
const config = loader_1.load(process.env.CONFIG_PATH, process.env.NODE_ENV);
exports.app = kernel_1.defaultDI().defaults().withConfig(config).get().resolve(App);
//# sourceMappingURL=app.js.map