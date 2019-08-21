import {Logger} from "../util/logger/log";
import {BIND_CONTROLLERS, ExampleServer} from "../api/api";
import {HttpBin} from "../services/bank_service";
import {Controller, HelloController} from "../api/controllers/hello";
import {Container} from "inversify";

const kernel = new Container({skipBaseClassChecks: true});

export function registerDefault(kernel: Container): Container {
    kernel.bind(Logger).toSelf();
    kernel.bind(ExampleServer).toSelf();
    kernel.bind(HttpBin).toSelf().inSingletonScope();
    kernel.bind<Controller>(BIND_CONTROLLERS).to(HelloController);
    return kernel
}

export const defaultDI = registerDefault(kernel);
