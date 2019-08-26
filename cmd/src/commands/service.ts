import "reflect-metadata";
import {Command, flags} from '@oclif/command'
import {app} from "server/src/app";
import {load} from "server/src/config/loader";

export class Service extends Command {
    static description = 'describe the command here'

    static examples = [
        `$ cmd hello
hello world from ./src/hello.ts!
`,
    ]

    static flags = {
        config: flags.string(),
        env: flags.enum({
            options: ['dev']
        })
    }

    async run() {
        const {flags} = this.parse(Service)

        const config = load(flags.config, flags.env);

        app(config).run()
    }
}
