"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_1 = require("../../util/trace/trace");
function traceMiddleware(req, res, next) {
    trace_1.withNewTrace(() => {
        next();
    });
}
exports.traceMiddleware = traceMiddleware;
//# sourceMappingURL=trace.js.map