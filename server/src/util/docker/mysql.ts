import 'reflect-metadata'
import * as Dockerode from "dockerode";
import * as portfinder from 'portfinder'
import {Docker, DockerBase, PortMapping} from "./base";
import {Sequelize} from "sequelize";
import {Promises} from "../time/timeout";
import {log} from "../logger/log";
import moment = require("moment");

export class MysqlContainer extends Docker {
    private sequelize: Sequelize;

    constructor(mapping: PortMapping, container: Dockerode.Container) {
        super(mapping, container);

        this.sequelize = new Sequelize('', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            port: this.mapping["3306"]
        });
    }

    async connect() {
        log.info(`trying... ${this.mapping["3306"]}`)

        await new Promise((r, f) => this.sequelize.authenticate().then(r).catch(f))
    }
}

export class Mysql extends DockerBase {
    docker = new Dockerode()

    async start(version = "8.0.12"): Promise<MysqlContainer> {
        const port = await portfinder.getPortPromise()

        const mapping: PortMapping = {
            "3306": port,
        }

        const image = `mysql:${version}`

        await this.docker.pull(image, {})

        const container = await this.docker.createContainer({
            Image: image,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ["--default-authentication-plugin=mysql_native_password"],
            Env: ["MYSQL_ALLOW_EMPTY_PASSWORD=true"],
            HostConfig: {
                PortBindings: {
                    "3306/tcp": [
                        {
                            "HostPort": port.toString()
                        }
                    ]
                }
            }
        })

        await container.start()

        const mysql = new MysqlContainer(mapping, container)

        const end = moment().add(10, "seconds")

        while (moment().isBefore(end)) {
            try {
                await mysql.connect()

                log.info("connected!")

                return mysql
            } catch (e) {
                await Promises.timeout(250)
            }
        }

        throw new Error("timed out connecting")
    }
}
