import "reflect-metadata";
import { Connection } from "typeorm-core";
import {
    createTestingConnections,
    closeTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Person } from "./entity/Person";
import { Men } from "./entity/Men";
import { Women } from "./entity/Women";

describe("github issues > #3857 Schema inheritance when STI pattern is used", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                enabledDrivers: ["postgres", "mariadb", "mysql"],
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                schema: "custom",
                schemaCreate: true,
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("Child classes should have same schema as parent", () =>
        Promise.all(
            connections.map(async (connection) => {
                const personMetadata = connection.getMetadata(Person);
                const menMetadata = connection.getMetadata(Men);
                const womenMetadata = connection.getMetadata(Women);
                personMetadata.schema!.should.be.eq("custom");
                menMetadata.schema!.should.be.eq(personMetadata.schema);
                womenMetadata.schema!.should.be.eq(personMetadata.schema);
            })
        ));
});
