import * as Dockerode from "dockerode";
import * as portfinder from 'portfinder'
import {Docker, DockerBase, PortMapping} from "./base";

export class MysqlContainer extends Docker {
        
}

export class Mysql extends DockerBase {
    docker = new Dockerode()

    async start(version = "8.0.12"): Promise<Docker> {
        const port = await portfinder.getPortPromise()

        const mapping: PortMapping = {
            "3306": port,
        }

        const image = `mysql:${version}`

        await this.docker.pull(image, {})

        const container = await this.docker.createContainer({
            Image: image,
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

        if (await !this.logs(container, "X Plugin ready for connections")) {
            throw new Error("Unable to start container")
        }

        return new Docker(mapping, container)
    }
}
