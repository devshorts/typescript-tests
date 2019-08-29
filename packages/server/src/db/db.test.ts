import {getPortPromise} from "portfinder";
import {SetupModels} from "./model/core";
import {Users} from "./model/users";
import {Connection} from "./connection";

test('sqlite', async () => {
    const openPort = await getPortPromise()

    const sqlite = await new Connection(openPort, 'sqlite')

    await sqlite.connect(60)

    const models = new SetupModels(sqlite.sequelize)

    await models.setup()

    await Users.new({
        username: "anton"
    }).save()

    const users = await Users.findAll()

    expect(users.length).toBeGreaterThan(0)
})
