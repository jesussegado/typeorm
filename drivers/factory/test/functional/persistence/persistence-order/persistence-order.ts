import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { ConnectionMetadataBuilder } from "typeorm-core/build/compiled/src/connection/ConnectionMetadataBuilder";
import { EntityMetadataValidator } from "typeorm-core/build/compiled/src/metadata-builder/EntityMetadataValidator";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";
import { createDriver } from "../../../../src";

describe("persistence > order of persistence execution operations", () => {
    describe("should throw exception when non-resolvable circular relations found", function () {
        it("should throw CircularRelationsError", () => {
            const connection = new Connection(
                {
                    connectionOptions: {
                        // dummy connection options, connection won't be established anyway
                        type: "mysql",
                        host: "localhost",
                        username: "test",
                        password: "test",
                        database: "test",
                    },
                    typeORMOptions: {
                        entities: [`${__dirname}/entity/*{.js,.ts}`],
                    },
                },
                createDriver
            );
            const connectionMetadataBuilder = new ConnectionMetadataBuilder(
                connection
            );
            const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas(
                [`${__dirname}/entity/*{.js,.ts}`]
            );
            const entityMetadataValidator = new EntityMetadataValidator();
            expect(() =>
                entityMetadataValidator.validateMany(
                    entityMetadatas,
                    connection.driver
                )
            ).to.throw(Error);
        });
    });

    describe.skip("should persist all entities in correct order", function () {
        let connections: Connection[];
        before(
            async () =>
                (connections = await createTestingConnections({
                    entities: [`${__dirname}/entity/*{.js,.ts}`],
                }))
        );
        beforeEach(() => reloadTestingDatabases(connections));
        after(() => closeTestingConnections(connections));
        it("", () =>
            Promise.all(
                connections.map(async (connection) => {
                    // create first category and post and save them
                    const category1 = new Category();
                    category1.name = "Category saved by cascades #1";

                    const post1 = new Post();
                    post1.title = "Hello Post #1";
                    post1.category = category1;

                    await connection.manager.save(post1);
                })
            ));
    });
});
