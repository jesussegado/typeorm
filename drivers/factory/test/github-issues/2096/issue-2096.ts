import "reflect-metadata";
import { expect } from "chai";
import { createConnection } from "typeorm-core";
import { getTypeOrmConfig } from "../../utils/test-utils";
import { createDriver } from '../../../src';

describe("github issues > #2096 [mysql] Database name isn't read from url", () => {
    it("should be possible to define a database by connection url for mysql", async () => {
        const config = getTypeOrmConfig();

        // it is important to synchronize here, to trigger EntityMetadataValidator.validate
        // that previously threw the error where the database on the driver object was undefined
        if (config.find((c) => c.typeORMOptions.name === "mysql" && !c.skip)) {
            const connection = await createConnection({
                connectionOptions: {
                    url: "mysql://root:admin@localhost:3306/test",
                    type: "mysql",
                },
                typeORMOptions: {
                    name: "#2096",
                    entities: [`${__dirname}/entity/*{.js,.ts}`],
                    synchronize: true,
                },
            }, createDriver);
            expect(connection.isConnected).to.eq(true);
            await connection.close();
        }
    });
});
