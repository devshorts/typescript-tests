import {Container} from "dockerode";

export class DockerBase {
    async logs(container: Container, target: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                container.logs({
                    follow: true,
                    stdout: true,
                    stderr: true,
                }).then(logs => {
                    logs.on('data', chunk => {
                        console.log(chunk.toString())
                        if (chunk.toString().includes(target)) {
                            // tslint:disable-next-line:ban-ts-ignore
                            // @ts-ignore
                            logs.destroy()

                            logs.removeAllListeners()

                            resolve(true)
                        }
                    });

                    logs.on('end', () => resolve(false))
                })
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }
}

export interface PortMapping {
    [key: string]: number
}

export class Docker {
    constructor(public mapping: PortMapping, private container: Container) {
    }

    async close() {
        await this.container.kill()
    }
}
