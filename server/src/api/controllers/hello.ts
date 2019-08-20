import {injectable} from "inversify";
import {ClassWrapper, Controller, Get} from "@overnightjs/core";
import {Request, Response} from "express";
import {log} from "../../util/logger/log";
import * as expressAsyncHandler from 'express-async-handler';
import {OK} from 'http-status-codes';
import {HttpBin} from "../../services/bank_service";

export interface Controller {
}

@injectable()
@Controller("hello")
@ClassWrapper(expressAsyncHandler)
export class HelloController implements Controller {
    private log = log.with({controller: 'hello'});
    private bank: HttpBin;

    constructor(bank: HttpBin) {
        this.bank = bank;
    }

    @Get("bank/:id")
    private async index(req: Request, res: Response) {
        // tslint:disable-next-line:ban
        const result = await this.bank.getAccount(parseInt(req.params.id, 10));

        return res.status(OK).json(result)
    }
}

