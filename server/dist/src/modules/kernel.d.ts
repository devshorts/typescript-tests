import { Container } from "inversify";
import { Config } from "../config/loader";
export declare class Builder {
    kernel: Container;
    get(): Container;
    defaults(): Builder;
    withConfig(t: Config): this;
}
export declare const defaultDI: () => Builder;
