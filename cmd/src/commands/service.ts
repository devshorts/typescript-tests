import {app} from "server/src/app";
import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import SpinnerAction from "cli-ux/lib/action/spinner";
import {spinners} from "../util/spinners";
import {SQS} from "server/src/queue/pubsub";

export class Service extends Command {
    static description = 'describe the command here'

    static examples = [
        `$ cmd hello
hello world from ./src/hello.ts!
`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: 'name to print'}),
        // flag with no value (-f, --force)
        force: flags.boolean({char: 'f'}),
    }

    static args = [{name: 'file'}]

    async run() {
        const spinner = new SpinnerAction()
        spinner.frames = spinners.moon.frames

        cli.config.action = spinner

        cli.action.start('starting a process')

        const x = new SQS<string>()

        await x.process({
            data: "foo",
            traceID: "bar"
        })

        return new Promise(resolve => {
            setTimeout(() => {
                cli.action.stop('ready!')
                resolve()
                app({http_bin: 'https://httpbin.org/json'}).run()
            }, 100)
        })
    }
}

