"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../util/logger/log");
const process = require('process');
class Shutdown {
    constructor(listener) {
        this._shutdown = false;
        this.middleware = (req, res, next) => {
            if (!this._shutdown)
                return next();
            res.set('Connection', 'close');
            res.status(503).send('Server is in the process of restarting.');
        };
        this.listener = listener;
    }
    shutdown(onReady = () => process.exit(1)) {
        // Don't bother with graceful shutdown on development to speed up round trip
        if (!process.env.NODE_ENV) {
            log_1.log.info("Hard shutdown");
            process.exit(1);
        }
        log_1.log.info("Waiting for http listener to drain");
        this._shutdown = true;
        this.listener.close(() => {
            log_1.log.info("Goodbye!");
            onReady();
        });
    }
}
exports.Shutdown = Shutdown;
//# sourceMappingURL=shutdown.js.map