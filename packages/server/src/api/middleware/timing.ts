import {NextFunction, Request, Response} from "express";
import {log} from "@paradox/core/lib/logger/log";

export function timingMiddleware(req: Request, res: Response, next: NextFunction) {
    const now = process.hrtime.bigint();

    next();

    log.with({
        // tslint:disable-next-line:ban
        duration_ms: parseFloat(((process.hrtime.bigint() - now) / BigInt(1000)).toString()) / 1000,
        code: res.statusCode,
        path: req.path
    }).info("")
}
