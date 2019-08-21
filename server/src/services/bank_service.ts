import {injectable} from "inversify";
import * as request from "request-promise-native"

export class Slideshow {
    author?: string;

    date?: string
}

export class Root {
    slideshow?: Slideshow
}

@injectable()
export class HttpBin {
    async getAccount(id: number): Promise<Root> {
        const data = await request.get("https://httpbin.org/json");

        const result: Root = JSON.parse(data);

        if (result.slideshow === undefined) {
            throw new Error("missing required data")
        }

        return {
            slideshow: {
                author: result.slideshow.author,
                date: result.slideshow.date
            }
        }
    }
}
