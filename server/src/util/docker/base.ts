import {Container} from "dockerode";

export class DockerBase {
    async logs(container: Container, target: string): Promise<boolean> {
        try {
            const stream = await new Promise<NodeJS.ReadableStream>(r => container.logs({
                follow: true,
                stdout: true,
                stderr: true,
                timestamps: true
            }, (e, x) => r(x)))

            for await (const line of stream) {
                if (line.toString().search(target) !== -1) {
                    return true
                }
            }

            return false
        } catch (e) {
            console.log(e)
            return false
        }
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
