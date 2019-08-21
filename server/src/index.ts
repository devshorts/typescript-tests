import "reflect-metadata";
import {log} from "./util/logger/log";
import {injectable} from "inversify";
import {ExampleServer} from "./api/api";
import {defaultDI} from "./modules/kernel";

@injectable()
class App {
    private server: ExampleServer;

    constructor(server: ExampleServer) {
        this.server = server;
    }

    run(): void {
        log.info("app starting");

        this.server.start(9090);

        return
    }
}

defaultDI.resolve(App).run();
