import {injectable} from "inversify";
import {ClassWrapper, Controller, Get} from "@overnightjs/core";
import {Request, Response} from "express";
import * as expressAsyncHandler from 'express-async-handler';
import {OK} from 'http-status-codes';
import {HttpBin} from "../../services/bank_service";
import {APIController} from "./interfaces";


@injectable()
@Controller("hello")
@ClassWrapper(expressAsyncHandler)
export class HelloController implements APIController {
    constructor(private bank: HttpBin) {
    }

    @Get("bank/:id")
    private async index(req: Request, res: Response) {
        // tslint:disable-next-line:ban
        const result = await this.bank.getAccount(parseInt(req.params.id, 10));

        return res.status(OK).json(result)
    }
}

