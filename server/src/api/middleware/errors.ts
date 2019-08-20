import {NextFunction, Request, Response} from "express";
import {traceID} from "../../util/trace/trace";
import {log} from "../../util/logger/log";

export function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    log.with({
        error_message: error.message,
        stack: error.stack,
        url: req.url,
    }).error(error.name);

    res.status(500).json({
        msg: "An error occurred!",
        trace: traceID(),
    })
}
