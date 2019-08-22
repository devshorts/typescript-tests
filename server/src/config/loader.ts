import {log} from "../util/logger/log";
import * as convict from 'convict'
import * as path from 'path'

export interface Config {
    http_bin: string
}

export function load(configRoot: string | undefined, env: string | undefined): Config {
    if (configRoot === undefined) {
        throw new Error("Config path must be defined")
    }

    if (env === undefined) {
        env = "dev"
    }

    const schema = convict({
        http_bin: {
            format: 'url',
            default: ""
        }
    })

    const file = path.resolve(path.join(configRoot, `${env}.json`));

    const config = schema.loadFile(file)

    const loaded = config.get()

    if (loaded.http_bin === ""){
        throw new Error("http bin not set")
    }

    log.info(`loaded config for env ${env}`)

    return loaded
}
