import {DataType, ModelAttributeColumnOptions, ModelAttributes, Sequelize} from "sequelize";
import {Users} from "./users";

export type DAO<T> = {
    [P in keyof T]: DataType | ModelAttributeColumnOptions;
} & ModelAttributes

export class SetupModels {
    constructor(private sequelize: Sequelize) {

    }

    async setup(): Promise<void> {
        Users.register(this.sequelize)

        await this.sequelize.sync({force: true})
    }
}
