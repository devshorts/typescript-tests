import {BIND_CONTROLLERS, ExampleServer} from "../api/api";
import {HttpBin} from "../services/bank_service";
import {HelloController} from "../api/controllers/hello";
import {Container} from "inversify";
import {Bank, Consumer, Publisher, SQS} from '../queue/pubsub';
import {Logger} from "../util/logger/log";
import {Config} from "../config/loader";
import {APIController} from "../api/controllers/interfaces";

// Interface representing any type that has a newable constructor
interface Newable<T> {
    // tslint:disable-next-line:no-any
    new(...args: any[]): T;
}

export class Builder {
    kernel = new Container({skipBaseClassChecks: true});

    get(): Container {
        return this.kernel
    }

    defaults(): this {
        this.get().bind(Logger).toSelf();
        this.get().bind(ExampleServer).toSelf();
        this.get().bind(HttpBin).toSelf().inSingletonScope();
        this.get().bind<APIController>(BIND_CONTROLLERS).to(HelloController);
        this.get().bind<Consumer<Bank>>("sqs_consumer").to(SQS)
        this.get().bind<Publisher<Bank>>("sqs_publisher").to(Publisher)
        return this
    }

    withConfig(t: Config): this {
        this.get().bind("config").toConstantValue(t)
        return this
    }
}

export const defaultDI = () => new Builder()
