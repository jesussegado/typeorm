import "reflect-metadata";
import { Connection, EntityMetadata } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";

import { Person } from "./entity/person";

describe("github issues > #197 Fails to drop indexes when removing fields", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                schemaCreate: false,
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("it should drop the column and the referenced index", () =>
        Promise.all(
            connections.map(async (connection) => {
                const entityMetadata: EntityMetadata = connection.getMetadata(
                    Person
                );
                const idx: number = entityMetadata.columns.findIndex(
                    (x) => x.databaseName === "firstname"
                );
                entityMetadata.columns.splice(idx, 1);
                entityMetadata.indices = []; // clear the referenced index from metadata too

                await connection.synchronize(false);
            })
        ));
});
