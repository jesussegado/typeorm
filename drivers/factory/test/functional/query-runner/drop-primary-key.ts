import "reflect-metadata";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { isDriverSupported } from 'typeorm-core/build/compiled/src/driver/Driver';

describe("query runner > drop primary key", () => {
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

    it("should correctly drop primary key and revert drop", () =>
        Promise.all(
            connections.map(async (connection) => {
                // CockroachDB does not allow dropping primary key
                if (isDriverSupported(["cockroachdb"], connection.driver.type))
                    return;

                const queryRunner = connection.createQueryRunner();

                let table = await queryRunner.getTable("post");
                table!.findColumnByName("id")!.isPrimary.should.be.true;

                await queryRunner.dropPrimaryKey(table!);

                table = await queryRunner.getTable("post");
                table!.findColumnByName("id")!.isPrimary.should.be.false;

                await queryRunner.executeMemoryDownSql();

                table = await queryRunner.getTable("post");
                table!.findColumnByName("id")!.isPrimary.should.be.true;

                await queryRunner.release();
            })
        ));
});
