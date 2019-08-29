import {createNamespace} from "cls-hooked";
import uuid = require("uuid");

const name = "server";

const ns = createNamespace(name);

export const traceID = (): string => {
    return ns.get("trace")
};

export function withNewTrace<T>(fun: () => T, trace?: string): T {
    return ns.runAndReturn<T>((): T => {
        if (trace === undefined) {
            trace = uuid.v1()
        }
        ns.set("trace", trace)
        return fun()
    })
}
