import {Options, Request, RequestCallback, Response} from "request";


export interface Result {
    // tslint:disable-next-line:no-any
    error: any
    response: Response
    // tslint:disable-next-line:no-any
    body: any
}

export class Requests {
    static promise(method: (x: Options, y: RequestCallback) => Request): (x: Options) => Promise<Result> {
        return x => {
            return new Promise<Result>((resolve) => {
                method(x, (error, response, body) => {
                    const data: Result = {
                        error,
                        response,
                        body
                    }

                    resolve(data)
                })
            })
        }
    }
}
