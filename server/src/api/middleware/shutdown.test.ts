import "reflect-metadata";
import {Shutdown} from "./shutdown";
import * as http from "http";

describe('shutdown', () => {
    it('should shutdown', () => {
        const server = new http.Server(undefined);
        server['close'] = jest.fn().mockImplementation(result => result())

        const shutdown = new Shutdown(server)

        let shutDownCalled = false

        shutdown.shutdown(() => shutDownCalled = true)

        expect(shutDownCalled).toBeTruthy()
    });
});
