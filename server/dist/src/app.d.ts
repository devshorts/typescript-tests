import "reflect-metadata";
import { ExampleServer } from "./api/api";
import { Bank, Consumer } from "./queue/pubsub";
declare class App {
    private server;
    private consumer;
    constructor(server: ExampleServer, consumer: Consumer<Bank>);
    run(): void;
    close(): void;
}
export declare const app: App;
export {};
