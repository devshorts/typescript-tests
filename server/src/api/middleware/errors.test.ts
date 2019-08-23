import 'reflect-metadata'
import {ErrorBody, errorHandlerMiddleware} from "./errors";
import {Request, Response} from "express";

test("errors return 500", () => {
    const n = jest.fn()
    const req = {} as Request
    const res = {
        status(code: number): Response {
            expect(code).toEqual(500)
            return this
        },
        // tslint:disable-next-line:no-any
        json: (body: ErrorBody): Response => {
            expect(body.trace).not.toBeNull()
            expect(body.msg).toEqual("An error occurred!")
            return res
        }
    } as Response

    errorHandlerMiddleware(new Error("test"), req, res, n)
    expect(n).not.toHaveBeenCalled()
})

test("not errors to pass through", () => {
    const n = jest.fn()
    const req = {} as Request
    const res = {} as Response

    errorHandlerMiddleware(undefined, req, res, n)
    expect(n).toHaveBeenCalled()
})
