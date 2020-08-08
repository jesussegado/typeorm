import "reflect-metadata";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import { ForeignKeyMetadata } from "typeorm-core/build/compiled/src/metadata/ForeignKeyMetadata";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";

describe("schema builder > custom-db-and-schema-sync", () => {
    let connections: Connection[];
    before(async () => {
        connections = await createTestingConnections({
            entities: [`${__dirname}/entity/*{.js,.ts}`],
            enabledDrivers: ["mysql", "mssql", "postgres", "sap"],
            dropSchema: true,
        });
    });
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should correctly sync tables with custom schema and database", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner();
                const photoMetadata = connection.getMetadata("photo");
                const albumMetadata = connection.getMetadata("album");

                // create tables
                photoMetadata.synchronize = true;
                albumMetadata.synchronize = true;

                if (isDriverSupported(["mssql"], connection.driver.type)) {
                    photoMetadata.database = "secondDB";
                    photoMetadata.schema = "photo-schema";
                    photoMetadata.tablePath = "secondDB.photo-schema.photo";
                    photoMetadata.schemaPath = "secondDB.photo-schema";

                    albumMetadata.database = "secondDB";
                    albumMetadata.schema = "album-schema";
                    albumMetadata.tablePath = "secondDB.album-schema.album";
                    albumMetadata.schemaPath = "secondDB.album-schema";

                    await queryRunner.createDatabase(
                        photoMetadata.database,
                        true
                    );
                    await queryRunner.createSchema(
                        photoMetadata.schemaPath,
                        true
                    );
                    await queryRunner.createSchema(
                        albumMetadata.schemaPath,
                        true
                    );
                } else if (
                    isDriverSupported(
                        ["postgres", "sap"],
                        connection.driver.type
                    )
                ) {
                    photoMetadata.schema = "photo-schema";
                    photoMetadata.tablePath = "photo-schema.photo";
                    photoMetadata.schemaPath = "photo-schema";

                    albumMetadata.schema = "album-schema";
                    albumMetadata.tablePath = "album-schema.album";
                    albumMetadata.schemaPath = "album-schema";
                    await queryRunner.createSchema(
                        photoMetadata.schemaPath,
                        true
                    );
                    await queryRunner.createSchema(
                        albumMetadata.schemaPath,
                        true
                    );
                } else if (
                    isDriverSupported(["mysql"], connection.driver.type)
                ) {
                    photoMetadata.database = "secondDB";
                    photoMetadata.tablePath = "secondDB.photo";

                    albumMetadata.database = "secondDB";
                    albumMetadata.tablePath = "secondDB.album";

                    await queryRunner.createDatabase(
                        photoMetadata.database,
                        true
                    );
                }

                await connection.synchronize();

                // create foreign key
                const albumTable = await queryRunner.getTable(
                    albumMetadata.tablePath
                );
                let photoTable = await queryRunner.getTable(
                    photoMetadata.tablePath
                );
                albumTable!.should.be.exist;
                photoTable!.should.be.exist;

                const columns = photoMetadata.columns.filter(
                    (column) => column.propertyName === "albumId"
                );
                const referencedColumns = albumMetadata.columns.filter(
                    (column) => column.propertyName === "id"
                );
                const fkMetadata = new ForeignKeyMetadata({
                    entityMetadata: photoMetadata,
                    referencedEntityMetadata: albumMetadata,
                    columns,
                    referencedColumns,
                    namingStrategy: connection.namingStrategy,
                });
                photoMetadata.foreignKeys.push(fkMetadata);

                await connection.synchronize();

                photoTable = await queryRunner.getTable(
                    photoMetadata.tablePath
                );
                photoTable!.foreignKeys.length.should.be.equal(1);

                // drop foreign key
                photoMetadata.foreignKeys = [];
                await connection.synchronize();

                // drop tables manually, because they will not synchronize automatically
                await queryRunner.dropTable(
                    photoMetadata.tablePath,
                    true,
                    false
                );
                await queryRunner.dropTable(
                    albumMetadata.tablePath,
                    true,
                    false
                );

                // drop created database
                await queryRunner.dropDatabase("secondDB", true);

                await queryRunner.release();
            })
        ));
});
