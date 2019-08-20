import "reflect-metadata";
import {log, Logger} from "./util/logger/log";
import {Container, injectable} from "inversify";
import {BIND_CONTROLLERS, ExampleServer} from "./api/api";
import {Controller, HelloController} from "./api/controllers/hello";

@injectable()
class App {
    private server: ExampleServer;

    constructor(server: ExampleServer) {
        this.server = server;
    }

    run(): void {
        log.info("server starting");

        this.server.start(9090);

        return
    }
}

const kernel = new Container({skipBaseClassChecks: true});

kernel.bind(Logger).toSelf();
kernel.bind(ExampleServer).toSelf();
kernel.bind<Controller>(BIND_CONTROLLERS).to(HelloController);

kernel.resolve(App).run();
