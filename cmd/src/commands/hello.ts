import {Command, flags} from '@oclif/command'
import {app} from "server/dist/src/app";

export class Hello extends Command {
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
    app({http_bin: 'https://httpbin.org/json'}).run()
  }
}
