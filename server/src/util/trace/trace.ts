import {createNamespace, getNamespace} from "cls-hooked";
import uuid = require("uuid");

const name = "server";

const ns = createNamespace(name);

export const traceID = (): string => {
    return ns.get("trace")
};

export function withNewTrace(fun: () => void) {
    return ns.run(() => {
        ns.set("trace", uuid.v1())
        fun()
    })
}
