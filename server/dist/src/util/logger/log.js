"use strict";
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const winston = require("winston");
const inversify_1 = require("inversify");
const trace_1 = require("../trace/trace");
let Logger = Logger_1 = class Logger {
    constructor(ctx = {}) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console({ level: 'info', debugStdout: false }),
            ],
        });
        this.ctx = ctx;
    }
    info(msg) {
        this.logger.info(msg, this.meta());
    }
    error(msg) {
        this.logger.error(msg, this.meta());
    }
    warn(msg) {
        this.logger.warn(msg, this.meta());
    }
    debug(msg) {
        this.logger.debug(msg, this.meta());
    }
    trace(msg) {
        this.logger.silly(msg, this.meta());
    }
    // returns a new logger with the captured context
    with(obj) {
        return new Logger_1(obj);
    }
    meta() {
        return Object.assign({}, this.addCls(), this.ctx);
    }
    addCls() {
        return {
            trace: trace_1.traceID(),
        };
    }
};
Logger = Logger_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Logger);
exports.Logger = Logger;
exports.log = new Logger();
//# sourceMappingURL=log.js.map