import {BIND_CONTROLLERS, ExampleServer} from "../api/api";
import {HttpBin} from "../services/bank_service";
import {Controller, HelloController} from "../api/controllers/hello";
import {Container} from "inversify";
import {Bank, Consumer, Publisher, SQS} from '../queue/pubsub';
import {Logger} from "../util/logger/log";
import {Config} from "../config/loader";

// tslint:disable-next-line:no-any
interface Gen<T> {
    new(...args: any[]): T;
}

export class Builder {
    kernel = new Container({skipBaseClassChecks: true});

    get(): Container {
        return this.kernel
    }

    defaults(): Builder {
        this.withLogger(Logger)
        this.kernel.bind(ExampleServer).toSelf();
        this.kernel.bind(HttpBin).toSelf().inSingletonScope();
        this.kernel.bind<Controller>(BIND_CONTROLLERS).to(HelloController);
        this.kernel.bind<Consumer<Bank>>("sqs_consumer").to(SQS)
        this.kernel.bind<Publisher<Bank>>("sqs_publisher").to(Publisher)
        return this
    }

    withConfig(t: Config) {
        this.kernel.bind("config").toConstantValue(t)
        return this
    }

    withLogger<T extends Logger>(t: Gen<T>): Builder {
        this.kernel.bind(t).toSelf();
        return this
    }
}

export const defaultDI = () => new Builder()
