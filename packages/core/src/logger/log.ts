import * as winston from "winston";
import {injectable} from "inversify";
import {traceID} from "../trace/trace";

interface Cls {
    trace?: string
}

interface Context {
    [key: string]: string | number | undefined
}

@injectable()
export class Logger {
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()),
        transports: [
            new winston.transports.Console({level: 'info', debugStdout: false}),
        ],
    });
    private readonly ctx: Context;

    constructor(ctx: Context = {}) {
        this.ctx = ctx;
    }

    info(msg: string) {
        this.logger.info(msg, this.meta())
    }

    error(msg: string) {
        this.logger.error(msg, this.meta())
    }

    warn(msg: string) {
        this.logger.warn(msg, this.meta())
    }

    debug(msg: string) {
        this.logger.debug(msg, this.meta())
    }

    trace(msg: string) {
        this.logger.silly(msg, this.meta())
    }

    // returns a new logger with the captured context
    with(obj: Context): Logger {
        return new Logger(obj)
    }

    private meta(): object {
        return {...this.addCls(), ...this.ctx}
    }

    private addCls(): Cls {
        return {
            trace: traceID(),
        };
    }
}

export const log = new Logger();
