import { Bank, Publisher } from "../queue/pubsub";
import { Config } from "../config/loader";
export declare class Slideshow {
    author?: string;
    date?: string;
}
export declare class Root {
    slideshow?: Slideshow;
}
export declare class HttpBin {
    private publisher;
    private config;
    constructor(publisher: Publisher<Bank>, config: Config);
    getAccount(id: number): Promise<Root>;
}
