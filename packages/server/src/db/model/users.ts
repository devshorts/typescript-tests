import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import {DAO} from "./core";

export interface UserFields {
    id?: number
    username: string;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class Users extends Model {
    static dao(): DAO<UserFields> {
        return {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                primaryKey: true,
            },
            username: DataTypes.STRING(255)
        }
    }

    // new splats a user in a typesafe way
    static new(x: UserFields, options?: BuildOptions): Users {
        return Users.build({...x}, options)
    }

    static register(sequelize: Sequelize) {
        Users.init(Users.dao(), {sequelize, tableName: 'users'})
    }
}

