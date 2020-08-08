import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { User } from "./entity/User";

describe("github issues > #4452 InsertQueryBuilder fails on some SQL Expressions values", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                // enabledDrivers: ["postgres"],
                entities: [User],
                dropSchema: true,
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));
    it("should be able to use sql functions", () =>
        Promise.all(
            connections.map(async (connection) => {
                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                        name: "Ben Dover",
                        created_at: isDriverSupported(
                            ["oracle"],
                            connection.driver.type
                        )
                            ? () => "SYSDATE"
                            : () => "current_timestamp",
                    })
                    .execute();

                const loadedUser1 = await connection
                    .getRepository(User)
                    .findOne({ name: "Ben Dover" });
                expect(loadedUser1).to.exist;
                loadedUser1!.created_at.should.be.instanceOf(Date);
            })
        ));
});
