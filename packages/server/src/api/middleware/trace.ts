import {NextFunction, Request, Response} from "express";
import {withNewTrace} from "@paradox/core/lib/trace/trace";

export function traceMiddleware(req: Request, res: Response, next: NextFunction) {
    withNewTrace(() => {
        next()
    })
}

