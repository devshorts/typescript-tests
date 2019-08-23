"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../util/logger/log");
function timingMiddleware(req, res, next) {
    const now = process.hrtime.bigint();
    next();
    log_1.log.with({
        // tslint:disable-next-line:ban
        duration_ms: parseFloat(((process.hrtime.bigint() - now) / BigInt(1000)).toString()) / 1000,
        code: res.statusCode,
        path: req.path
    }).info("");
}
exports.timingMiddleware = timingMiddleware;
//# sourceMappingURL=timing.js.map