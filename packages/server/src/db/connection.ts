import 'reflect-metadata'
import {Dialect, Sequelize} from "sequelize";
import {log} from "@paradox/core/lib/logger/log";
import {Promises} from "@paradox/core/lib/time/timeout";
import moment = require("moment");
import uuid = require("uuid");

// Connection manages a sequelize connection
export class Connection {
    sequelize: Sequelize

    constructor(port: number, dialect: Dialect, dbName = `test-${uuid.v1}`) {
        this.sequelize = new Sequelize(dbName, 'root', '', {
            host: 'localhost',
            dialect,
            port
        });
    }

    // connect validates that the underlying DB is available for access
    async connect(timeoutSeconds: number) {
        const end = moment().add(timeoutSeconds, "seconds")

        while (moment().isBefore(end)) {
            try {
                await this.sequelize.authenticate()

                log.info("connected!")

                return
            } catch (e) {
                await Promises.timeout(250)
            }
        }

        throw new Error("timed out connecting")
    }
}
