import 'reflect-metadata'
import * as Dockerode from "dockerode";
import * as portfinder from 'portfinder'
import {Docker, DockerBase, PortMapping} from "./base";
import {Connection} from "../../db/connection";

export class MysqlContainer extends Docker {
    conn: Connection;

    constructor(mapping: PortMapping, container: Dockerode.Container) {
        super(mapping, container);

        this.conn = new Connection(this.mapping["3306"], 'mysql')
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

        await mysql.conn.connect(60)

        return mysql
    }
}
