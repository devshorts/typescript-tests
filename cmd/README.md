cmd
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cmd.svg)](https://npmjs.org/package/cmd)
[![Downloads/week](https://img.shields.io/npm/dw/cmd.svg)](https://npmjs.org/package/cmd)
[![License](https://img.shields.io/npm/l/cmd.svg)](https://github.com/akropp-stripe/cmd/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cmd
$ cmd COMMAND
running command...
$ cmd (-v|--version|version)
cmd/1.0.0 darwin-x64 node-v12.7.0
$ cmd --help [COMMAND]
USAGE
  $ cmd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cmd help [COMMAND]`](#cmd-help-command)
* [`cmd service`](#cmd-service)

## `cmd help [COMMAND]`

display help for cmd

```
USAGE
  $ cmd help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `cmd service`

describe the command here

```
USAGE
  $ cmd service

OPTIONS
  --config=config
  --env=(dev)

EXAMPLE
  $ cmd hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/service.ts](https://github.com/akropp/cmd/blob/v1.0.0/src/commands/service.ts)_
<!-- commandsstop -->
