import {NextFunction, Request, Response} from "express";
import * as http from "http";
import {log} from "../../util/logger/log";

const process = require('process');

export class Shutdown {
    private _shutdown = false;
    private listener: http.Server;

    constructor(listener: http.Server) {
        this.listener = listener;
    }

    shutdown(onReady: () => void = () => process.exit(1)) {
        log.info("Waiting for http listener to drain");

        this._shutdown = true;
        this.listener.close(() => {
            log.info("Goodbye!");
            onReady()
        })
    }

    middleware = (req: Request, res: Response, next: NextFunction) => {
        if (!this._shutdown) return next();
        res.set('Connection', 'close');
        res.status(503).send('Server is in the process of restarting.');
    }
}
