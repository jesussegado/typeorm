import "reflect-metadata";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
} from "../../utils/test-utils";
import { User } from "./entity/User";
import { ColumnMetadata } from 'typeorm-core/build/compiled/src/metadata/ColumnMetadata';
import { ColumnMetadataArgs } from 'typeorm-core/build/compiled/src/metadata-args/ColumnMetadataArgs';

describe("github issues > #1623 NOT NULL constraint failed after a new column is added (SQLite)", () => {
    let connections: Connection[];
    before(async () => {
        connections = await createTestingConnections({
            entities: [`${__dirname}/entity/*{.js,.ts}`],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => closeTestingConnections(connections));

    it("should correctly add new column", () =>
        Promise.all(
            connections.map(async (connection) => {
                const userMetadata = connection.getMetadata(User);

                const columnMetadata = new ColumnMetadata({
                    connection,
                    entityMetadata: userMetadata,
                    args: {
                        target: User,
                        propertyName: "userName",
                        mode: "regular",
                        options: {
                            type: "varchar",
                            name: "userName",
                        },
                    } as ColumnMetadataArgs,
                });
                columnMetadata.build(connection);

                userMetadata.columns.push(columnMetadata);

                await connection.synchronize();

                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("user");
                const column1 = table!.findColumnByName("userName")!;
                await queryRunner.release();

                column1.should.be.exist;
            })
        ));
});
