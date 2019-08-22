import "reflect-metadata"
import * as supertest from 'supertest'
import {defaultDI} from "../modules/kernel";
import {ExampleServer} from './api';

describe("api tests", () => {
    beforeAll(() => {
        console.log("Running test")
    });
    afterAll(() => {
        console.log("After test")
    });

    test("api", done => {
        supertest(server().express())
            .get("/hello/bank/1")
            .expect(200)
            .end(done)
    });

    test("missing route", done => {
        supertest(server().express())
            .get("/asdf/bank/2")
            .expect(404)
            .end(done)
    });
});

const server = () => {
    return defaultDI().defaults().withConfig({http_bin: "https://httpbin.org/json"}).get().resolve(ExampleServer);
}
