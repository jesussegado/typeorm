import "reflect-metadata";
import { expect } from "chai";
import {
    createTestingConnections,
    closeTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";

it("github issues > #3588 Migration:generate issue with onUpdate using mysql 8.0", async () => {
    const connections = await createTestingConnections({
        entities: [`${__dirname}/entity/*{.js,.ts}`],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mysql"],
    });
    await reloadTestingDatabases(connections);
    await Promise.all(
        connections.map(async (connection) => {
            const schemaBuilder = connection.driver.createSchemaBuilder();
            const syncQueries = await schemaBuilder.log();
            expect(syncQueries.downQueries).to.be.eql([]);
            expect(syncQueries.upQueries).to.be.eql([]);
        })
    );
    await closeTestingConnections(connections);
});
