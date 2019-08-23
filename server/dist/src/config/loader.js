"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../util/logger/log");
const convict = require("convict");
const path = require("path");
function load(configRoot, env) {
    if (configRoot === undefined) {
        throw new Error("Config path must be defined");
    }
    if (env === undefined) {
        env = "dev";
    }
    const schema = convict({
        http_bin: {
            format: 'url',
            default: ""
        }
    });
    const file = path.resolve(path.join(configRoot, `${env}.json`));
    const config = schema.loadFile(file);
    const loaded = config.get();
    if (loaded.http_bin === "") {
        throw new Error("http bin not set");
    }
    log_1.log.info(`loaded config for env ${env}`);
    return loaded;
}
exports.load = load;
//# sourceMappingURL=loader.js.map