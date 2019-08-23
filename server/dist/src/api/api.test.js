"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const supertest = require("supertest");
const kernel_1 = require("../modules/kernel");
const api_1 = require("./api");
describe("api tests", () => {
    beforeAll(() => {
        console.log("Running test");
    });
    afterAll(() => {
        console.log("After test");
    });
    test("api", done => {
        supertest(server().express())
            .get("/hello/bank/1")
            .expect(200)
            .end(done);
    });
    test("missing route", done => {
        supertest(server().express())
            .get("/asdf/bank/2")
            .expect(404)
            .end(done);
    });
});
const server = () => {
    return kernel_1.defaultDI().defaults().withConfig({ http_bin: "https://httpbin.org/json" }).get().resolve(api_1.ExampleServer);
};
//# sourceMappingURL=api.test.js.map