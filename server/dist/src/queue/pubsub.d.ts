declare type TraceID = string;
export interface Payload<T> {
    traceID: TraceID;
    data: T;
}
export interface Bank {
    name: string;
}
export declare abstract class Consumer<T> {
    read(t: Payload<T>): Promise<void>;
    abstract process(t: Payload<T>): Promise<void>;
}
export declare class Publisher<T> {
    private consumer;
    constructor(consumer: Consumer<T>);
    send(t: T): Promise<void>;
}
export declare class SQS<T> extends Consumer<T> {
    process(t: Payload<T>): Promise<void>;
}
export {};
