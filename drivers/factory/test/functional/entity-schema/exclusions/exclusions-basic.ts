import "reflect-metadata";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils";
import { MeetingSchema } from "./entity/Meeting";

describe("entity-schema > exclusions", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [MeetingSchema as any],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should create an exclusion constraint", () =>
        Promise.all(
            connections.map(async (connection) => {
                // Only PostgreSQL supports exclusion constraints.
                if (!isDriverSupported(["postgres"], connection.driver.type))
                    return;

                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("meeting");
                await queryRunner.release();

                table!.exclusions.length.should.be.equal(1);
            })
        ));
});
