export class Promises {
    static timeout = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
}

export class Deferred<T> {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    private _resolve: (x: T) => void
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:no-any
    private _reject: (x: Error) => void
    private readonly _p: Promise<T>

    constructor() {
        this._p = new Promise((ok, bad) => {
            this._resolve = ok
            this._reject = bad
        })
    }

    p(): Promise<T> {
        return this._p
    }

    resolve(data: T) {
        this._resolve(data)
    }

    reject(err: Error) {
        this._reject(err)
    }
}
