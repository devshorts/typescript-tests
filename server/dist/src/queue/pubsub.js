"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const log_1 = require("../util/logger/log");
const inversify_1 = require("inversify");
const trace_1 = require("../util/trace/trace");
class Consumer {
    async read(t) {
        log_1.log.debug("Got payload");
        return trace_1.withNewTrace(() => {
            return this.process(t);
        }, t.traceID);
    }
}
exports.Consumer = Consumer;
let Publisher = class Publisher {
    constructor(consumer) {
        this.consumer = consumer;
    }
    async send(t) {
        return this.consumer.read({ data: t, traceID: trace_1.traceID() });
    }
};
Publisher = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject("sqs_consumer")),
    tslib_1.__metadata("design:paramtypes", [Consumer])
], Publisher);
exports.Publisher = Publisher;
let SQS = class SQS extends Consumer {
    async process(t) {
        return new Promise(resolve => {
            setTimeout(() => {
                log_1.log.info("message received");
                resolve();
            }, 250);
        });
    }
};
SQS = tslib_1.__decorate([
    inversify_1.injectable()
], SQS);
exports.SQS = SQS;
//# sourceMappingURL=pubsub.js.map