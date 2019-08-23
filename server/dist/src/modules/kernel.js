"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api/api");
const bank_service_1 = require("../services/bank_service");
const hello_1 = require("../api/controllers/hello");
const inversify_1 = require("inversify");
const pubsub_1 = require("../queue/pubsub");
const log_1 = require("../util/logger/log");
class Builder {
    constructor() {
        this.kernel = new inversify_1.Container({ skipBaseClassChecks: true });
    }
    get() {
        return this.kernel;
    }
    defaults() {
        this.kernel.bind(log_1.Logger).toSelf();
        this.kernel.bind(api_1.ExampleServer).toSelf();
        this.kernel.bind(bank_service_1.HttpBin).toSelf().inSingletonScope();
        this.kernel.bind(api_1.BIND_CONTROLLERS).to(hello_1.HelloController);
        this.kernel.bind("sqs_consumer").to(pubsub_1.SQS);
        this.kernel.bind("sqs_publisher").to(pubsub_1.Publisher);
        return this;
    }
    withConfig(t) {
        this.kernel.bind("config").toConstantValue(t);
        return this;
    }
}
exports.Builder = Builder;
exports.defaultDI = () => new Builder();
//# sourceMappingURL=kernel.js.map