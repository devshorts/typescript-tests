"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_1 = require("../../util/trace/trace");
const log_1 = require("../../util/logger/log");
function errorHandlerMiddleware(error, req, res, next) {
    if (error !== undefined) {
        log_1.log.with({
            error_message: error.message,
            stack: error.stack,
            url: req.url,
        }).error(error.name);
        res.status(500).json({
            msg: "An error occurred!",
            trace: trace_1.traceID(),
        });
    }
    else {
        next();
    }
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errors.js.map