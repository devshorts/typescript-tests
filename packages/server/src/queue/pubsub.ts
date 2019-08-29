import {log} from "@paradox/core/lib/logger/log";
import {injectable, inject} from 'inversify';
import {traceID, withNewTrace} from "@paradox/core/lib/trace/trace";

type TraceID = string

export interface Payload<T> {
    traceID: TraceID
    data: T
}

export interface Bank {
    name: string
}

export abstract class Consumer<T> {
    async read(t: Payload<T>): Promise<void> {
        log.debug("Got payload")
        return withNewTrace(() => {
            return this.process(t)
        }, t.traceID)
    }

    async abstract process(t: Payload<T>): Promise<void>
}

@injectable()
export class Publisher<T> {
    constructor(@inject("sqs_consumer") private consumer: Consumer<T>){}

    async send(t: T): Promise<void> {
        return this.consumer.read({data: t, traceID: traceID()})
    }
}

@injectable()
export class SQS<T> extends Consumer<T> {
    async process(t: Payload<T>): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                log.info("message received")
                resolve()
            }, 250)
        })
    }
}
