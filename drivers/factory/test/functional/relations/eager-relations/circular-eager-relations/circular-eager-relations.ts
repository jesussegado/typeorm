import "reflect-metadata";
import { expect } from "chai";
import {  Connection  } from "typeorm-core";
import { ConnectionMetadataBuilder} from "typeorm-core/build/compiled/src/connection/ConnectionMetadataBuilder"
import { EntityMetadataValidator} from "typeorm-core/build/compiled/src/metadata-builder/EntityMetadataValidator"
import { createDriver } from '../../../../../src';

describe("relations > eager relations > circular eager relations", () => {
    it("should throw error if eager: true is set on both sides of relationship", () => {
        const connection = new Connection({
            connectionOptions: {
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
            },
            typeORMOptions: {
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            },
        }, createDriver);
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(
            connection
        );
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([
            `${__dirname}/entity/*{.js,.ts}`,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() =>
            entityMetadataValidator.validateMany(
                entityMetadatas,
                connection.driver
            )
        ).to.throw(Error);
    });
});
