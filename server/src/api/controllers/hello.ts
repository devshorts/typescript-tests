import {injectable} from "inversify";
import {Controller, Get} from "@overnightjs/core";
import {Request, Response} from "express";
import {log} from "../../util/logger/log";
import {OK} from 'http-status-codes';
import {traceID} from "../../util/trace/trace";

export interface Controller {
}

@injectable()
@Controller("hello")
export class HelloController implements Controller {
    private log = log.with({controller: 'hello'})

    @Get("")
    private index(req: Request, res: Response) {
        this.log.info("Got default!");
        this.log.info("Do more work");
        return res.status(OK).json({trace: traceID()})
    }
}

