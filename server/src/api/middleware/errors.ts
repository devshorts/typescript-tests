import {NextFunction, Request, Response} from "express";
import {traceID} from "../../util/trace/trace";
import {log} from "../../util/logger/log";

export interface ErrorBody {
    msg: string
    trace: string
}

export function errorHandlerMiddleware(error: Error | undefined, req: Request, res: Response, next: NextFunction) {
    if (error !== undefined) {
        log.with({
            error_message: error.message,
            stack: error.stack,
            url: req.url,
        }).error(error.name);

        res.status(500).json({
            msg: "An error occurred!",
            trace: traceID(),
        })
    } else {
        next()
    }
}
