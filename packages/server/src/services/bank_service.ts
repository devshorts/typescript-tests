import {inject, injectable} from "inversify";
import * as request from "request-promise-native"
import {Bank, Publisher} from "../queue/pubsub";
import {Config} from "../config/loader";
import {Root} from "@paradox/server-client/lib/model";

@injectable()
export class HttpBin {
    constructor(
        @inject("sqs_publisher") private publisher: Publisher<Bank>,
        @inject("config") private config: Config,
    ) {
    }

    async getAccount(id: number): Promise<Root> {
        const data = await request.get(this.config.http_bin);

        const result: Root = JSON.parse(data);

        if (result.slideshow === undefined) {
            throw new Error("missing required data")
        }

        await this.publisher.send({
            name: id.toString()
        })

        return {
            slideshow: {
                author: result.slideshow.author,
                date: result.slideshow.date
            }
        }
    }
}

