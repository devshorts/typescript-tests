import * as winston from "winston";
interface Context {
    [key: string]: string | number | undefined;
}
export declare class Logger {
    logger: winston.Logger;
    private readonly ctx;
    constructor(ctx?: Context);
    info(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
    debug(msg: string): void;
    trace(msg: string): void;
    with(obj: Context): Logger;
    private meta;
    private addCls;
}
export declare const log: Logger;
export {};
