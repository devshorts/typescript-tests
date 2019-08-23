"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cls_hooked_1 = require("cls-hooked");
const uuid = require("uuid");
const name = "server";
const ns = cls_hooked_1.createNamespace(name);
exports.traceID = () => {
    return ns.get("trace");
};
function withNewTrace(fun, trace) {
    return ns.runAndReturn(() => {
        if (trace === undefined) {
            trace = uuid.v1();
        }
        ns.set("trace", trace);
        return fun();
    });
}
exports.withNewTrace = withNewTrace;
//# sourceMappingURL=trace.js.map