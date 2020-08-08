import "reflect-metadata";
import {
    createTestingConnections,
    closeTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Connection, Table } from "typeorm-core";
import { isDriverSupported } from 'typeorm-core/build/compiled/src/driver/Driver';

describe("github issues > #3379 Migration will keep create and drop indexes if index name is the same across tables", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not recreate indices", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner();

                let postTableName: string = "post";

                if (isDriverSupported(["mssql"], connection.driver.type)) {
                    postTableName = "testDB.testSchema.post";
                    await queryRunner.createDatabase("testDB", true);
                    await queryRunner.createSchema("testDB.testSchema", true);
                } else if (
                    isDriverSupported(["postgres"], connection.driver.type)
                ) {
                    postTableName = "testSchema.post";
                    await queryRunner.createSchema("testSchema", true);
                } else if (
                    isDriverSupported(["mysql"], connection.driver.type)
                ) {
                    postTableName = "testDB.post";
                    await queryRunner.createDatabase("testDB", true);
                }

                await queryRunner.createTable(
                    new Table({
                        name: postTableName,
                        columns: [
                            {
                                name: "id",
                                type: isDriverSupported(
                                    ["sqlite-abstract"],
                                    connection.driver.type
                                )
                                    ? "integer"
                                    : "int",
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: "increment",
                            },
                            {
                                name: "name",
                                type: "varchar",
                            },
                        ],
                        indices: [
                            { name: "name_index", columnNames: ["name"] },
                        ],
                    }),
                    true
                );

                // Only MySQL and SQLServer allows non unique index names
                if (
                    isDriverSupported(
                        ["mysql", "mssql"],
                        connection.driver.type
                    )
                ) {
                    await queryRunner.createTable(
                        new Table({
                            name: "category",
                            columns: [
                                {
                                    name: "id",
                                    type: "int",
                                    isPrimary: true,
                                    isGenerated: true,
                                    generationStrategy: "increment",
                                },
                                {
                                    name: "name",
                                    type: "varchar",
                                },
                            ],
                            indices: [
                                { name: "name_index", columnNames: ["name"] },
                            ],
                        }),
                        true
                    );
                }

                await queryRunner.release();

                const sqlInMemory = await connection.driver
                    .createSchemaBuilder()
                    .log();
                sqlInMemory.upQueries.length.should.be.equal(0);
            })
        ));
});
