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

    close(): void {
        this.server.stop()
    }
}

const app = defaultDI.resolve(App);

process.once('SIGINT', code => {
    log.info('SIGINT received...');
    app.close()
});

app.run();
