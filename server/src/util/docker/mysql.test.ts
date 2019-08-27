import {Mysql} from "./mysql";

test('mysql', async () => {
    const container = await new Mysql().start()

    expect(container.mapping["3306"]).not.toBeNaN()

    await container.close()
}, 20000)
