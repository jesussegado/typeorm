import "reflect-metadata";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils";
import { PersonSchema } from "./entity/Person";

describe("entity-schema > checks", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [PersonSchema as any],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should create a check constraints", () =>
        Promise.all(
            connections.map(async (connection) => {
                // Mysql does not support check constraints.
                if (isDriverSupported(["mysql"], connection.driver.type))
                    return;

                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("person");
                await queryRunner.release();

                table!.checks.length.should.be.equal(2);
            })
        ));
});
