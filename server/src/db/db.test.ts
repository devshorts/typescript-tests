import {getPortPromise} from "portfinder";
import {Connection} from "../util/docker/connection";
import {SetupModels} from "./model/core";
import {Users} from "./model/users";

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
