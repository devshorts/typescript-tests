import * as request from "request"
import {Root} from "./model";
import {Requests} from "@paradox/core/lib/http/request";

type BankID = number

export class ServerClient {
    constructor(private url: string) {

    }

    async getAccount(id: BankID): Promise<Root> {
        const result = await Requests.promise(request.get)({
            uri: `${this.url}/hello/bank/${id}`
        })

        return JSON.parse(result.response.body) as Root
    }
}
