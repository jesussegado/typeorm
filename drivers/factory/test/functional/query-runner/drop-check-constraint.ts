import "reflect-metadata";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";

describe("query runner > drop check constraint", () => {
    let connections: Connection[];
    before(async () => {
        connections = await createTestingConnections({
            entities: [`${__dirname}/entity/*{.js,.ts}`],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should correctly drop check constraint and revert drop", () =>
        Promise.all(
            connections.map(async (connection) => {
                // Mysql does not support check constraints.
                if (isDriverSupported(["mysql"], connection.driver.type))
                    return;

                const queryRunner = connection.createQueryRunner();

                let table = await queryRunner.getTable("post");
                table!.checks.length.should.be.equal(1);

                await queryRunner.dropCheckConstraint(table!, table!.checks[0]);

                table = await queryRunner.getTable("post");
                table!.checks.length.should.be.equal(0);

                await queryRunner.executeMemoryDownSql();

                table = await queryRunner.getTable("post");
                table!.checks.length.should.be.equal(1);

                await queryRunner.release();
            })
        ));
});
