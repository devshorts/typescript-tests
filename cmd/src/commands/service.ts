import "reflect-metadata";
import {Command} from '@oclif/command'
import {app} from "server/src/app";

export class Service extends Command {
    static description = 'describe the command here'

    static examples = [
        `$ cmd hello
hello world from ./src/hello.ts!
`,
    ]

    static flags = {}

    async run() {
        app.run()
    }
}
