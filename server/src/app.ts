import "reflect-metadata";
import {log} from "./util/logger/log";
import {inject, injectable} from "inversify";
import {ExampleServer} from "./api/api";
import {defaultDI} from "./modules/kernel";
import {Bank, Consumer} from "./queue/pubsub";
import {Config, load} from "./config/loader";

@injectable()
class App {
    constructor(
        private server: ExampleServer,
        @inject("sqs_consumer") private consumer: Consumer<Bank>,
    ) {
        process.once('SIGINT', () => {
            log.info('SIGINT received...');
            this.close()
        });
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

export const config = () => load(process.env.CONFIG_PATH, process.env.NODE_ENV);

export function app(config: Config): App {
    return defaultDI().defaults().withConfig(config).get().resolve(App);
}
