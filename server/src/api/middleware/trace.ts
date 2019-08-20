import {NextFunction, Request, Response} from "express";
import {withNewTrace} from "../../util/trace/trace";

export function traceMiddleware(req: Request, res: Response, next: NextFunction) {
    withNewTrace(() => {
        next()
    })
}

