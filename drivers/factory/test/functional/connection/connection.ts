import "reflect-metadata";
import { expect } from "chai";
import { PromiseUtils } from "typeorm-base";
import {
    Connection,
    Repository,
    TreeRepository,
    getConnectionManager,
    EntityManager,
} from "typeorm-core";
import { PostgresConnectionOptions } from "typeorm-core/build/compiled/src/driver/postgres/PostgresConnectionOptions";
import { CannotGetEntityManagerNotConnectedError } from "typeorm-core/build/compiled/src/error/CannotGetEntityManagerNotConnectedError";
import { NoConnectionForRepositoryError } from "typeorm-core/build/compiled/src/error/NoConnectionForRepositoryError";
import { Post } from "./entity/Post";
import { Guest as GuestV1 } from "./entity/v1/Guest";
import { Comment as CommentV1 } from "./entity/v1/Comment";
import { Guest as GuestV2 } from "./entity/v2/Guest";
import { Comment as CommentV2 } from "./entity/v2/Comment";
import { View } from "./entity/View";
import { Category } from "./entity/Category";
import {
    closeTestingConnections,
    createTestingConnections,
    setupSingleTestingConnection,
} from "../../utils/test-utils";

import { createDriver } from "../../../src";

describe("Connection", () => {
    // const resourceDir = __dirname + "/../../../../../test/functional/connection/";

    describe("before connection is established", function () {
        let connection: Connection;
        before(async () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "default",
                entities: [],
            });
            if (!options) return;

            connection = getConnectionManager().create(options, createDriver);
        });
        after(() => {
            if (connection && connection.isConnected) return connection.close();

            return Promise.resolve();
        });

        it("connection.isConnected should be false", () => {
            if (!connection) return;

            connection.isConnected.should.be.false;
        });

        it.skip("entity manager and reactive entity manager should not be accessible", () => {
            expect(() => connection.manager).to.throw(
                CannotGetEntityManagerNotConnectedError
            );
        });

        it("should not be able to close", () => {
            if (!connection) return;
            return connection.close().should.be.rejected; // CannotCloseNotConnectedError
        });

        it("should not be able to sync a schema", () => {
            if (!connection) return;
            return connection.synchronize().should.be.rejected; // CannotCloseNotConnectedError
        });

        it.skip("should not be able to use repositories", () => {
            if (!connection) return;

            expect(() => connection.getRepository(Post)).to.throw(
                NoConnectionForRepositoryError
            );
            expect(() => connection.getTreeRepository(Category)).to.throw(
                NoConnectionForRepositoryError
            );
            // expect(() => connection.getReactiveRepository(Post)).to.throw(NoConnectionForRepositoryError);
            // expect(() => connection.getReactiveTreeRepository(Category)).to.throw(NoConnectionForRepositoryError);
        });

        it("should be able to connect", () => {
            if (!connection) return;
            return connection.connect().should.be.fulfilled;
        });
    });

    describe.skip("establishing connection", function () {
        it("should throw DriverOptionNotSetError when extra.socketPath and host is missing", function () {
            expect(() => {
                getConnectionManager().create(
                    {
                        connectionOptions: {
                            type: "mysql",
                            username: "test",
                            password: "test",
                            database: "test",
                        },
                        typeORMOptions: {
                            entities: [],
                            dropSchema: false,
                        },
                    },
                    createDriver
                );
            }).to.throw(Error);
        });
    });

    describe("after connection is established successfully", function () {
        let connections: Connection[];
        beforeEach(() =>
            createTestingConnections({
                entities: [Post, Category],
                schemaCreate: true,
                dropSchema: true,
            }).then((all) => (connections = all))
        );
        afterEach(() => closeTestingConnections(connections));

        it("connection.isConnected should be true", () =>
            connections.forEach((connection) => {
                connection.isConnected.should.be.true;
            }));

        it("entity manager and reactive entity manager should be accessible", () =>
            connections.forEach((connection) => {
                expect(connection.manager).to.be.instanceOf(EntityManager);
            }));

        it("should not be able to connect again", () =>
            connections.forEach((connection) => {
                return connection.connect().should.be.rejected; // CannotConnectAlreadyConnectedError
            }));

        it("should be able to close a connection", async () =>
            Promise.all(
                connections.map((connection) => {
                    return connection.close();
                })
            ));
    });

    describe("working with repositories after connection is established successfully", function () {
        let connections: Connection[];
        before(() =>
            createTestingConnections({
                entities: [Post, Category],
                schemaCreate: true,
                dropSchema: true,
            }).then((all) => (connections = all))
        );
        after(() => closeTestingConnections(connections));

        it("should be able to get simple entity repository", () =>
            connections.forEach((connection) => {
                connection.getRepository(Post).should.be.instanceOf(Repository);
                connection
                    .getRepository(Post)
                    .should.not.be.instanceOf(TreeRepository);
                connection.getRepository(Post).target.should.be.eql(Post);
            }));

        it("should be able to get tree entity repository", () =>
            connections.forEach((connection) => {
                connection
                    .getTreeRepository(Category)
                    .should.be.instanceOf(TreeRepository);
                connection
                    .getTreeRepository(Category)
                    .target.should.be.eql(Category);
            }));

        it("should not be able to get tree entity repository of the non-tree entities", () =>
            connections.forEach((connection) => {
                expect(() => connection.getTreeRepository(Post)).to.throw(
                    Error
                ); // RepositoryNotTreeError
            }));

        it("should not be able to get repositories that are not registered", () =>
            connections.forEach((connection) => {
                expect(() => connection.getRepository("SomeEntity")).to.throw(
                    Error
                ); // RepositoryNotTreeError
                expect(() =>
                    connection.getTreeRepository("SomeEntity")
                ).to.throw(Error); // RepositoryNotTreeError
            }));
    });

    describe("generate a schema when connection.syncSchema is called", function () {
        let connections: Connection[];
        before(() =>
            createTestingConnections({
                entities: [Post],
                schemaCreate: true,
                dropSchema: true,
            }).then((all) => (connections = all))
        );
        after(() => closeTestingConnections(connections));

        it("database should be empty after schema is synced with dropDatabase flag", () =>
            Promise.all(
                connections.map(async (connection) => {
                    const postRepository = connection.getRepository(Post);
                    const post = new Post();
                    post.title = "new post";
                    await postRepository.save(post);
                    const loadedPost = await postRepository.findOne(post.id);
                    expect(loadedPost).to.be.eql(post);
                    await connection.synchronize(true);
                    const againLoadedPost = await postRepository.findOne(
                        post.id
                    );
                    expect(againLoadedPost).to.be.undefined;
                })
            ));
    });

    describe("log a schema when connection.logSyncSchema is called", function () {
        let connections: Connection[];
        before(
            async () =>
                (connections = await createTestingConnections({
                    entities: [Post],
                }))
        );
        after(() => closeTestingConnections(connections));

        it("should return sql log properly", () =>
            Promise.all(
                connections.map(async (connection) => {
                    await connection.driver.createSchemaBuilder().log();
                    // console.log(sql);
                })
            ));
    });

    describe("after connection is closed successfully", function () {
        // open a close connections
        let connections: Connection[] = [];
        before(() =>
            createTestingConnections({
                entities: [Post],
                schemaCreate: true,
                dropSchema: true,
            }).then((all) => {
                connections = all;
                return Promise.all(
                    connections.map((connection) => connection.close())
                );
            })
        );

        it("should not be able to close already closed connection", () =>
            connections.forEach((connection) => {
                return connection.close().should.be.rejected; // CannotCloseNotConnectedError
            }));

        it("connection.isConnected should be false", () =>
            connections.forEach((connection) => {
                connection.isConnected.should.be.false;
            }));
    });

    describe("skip schema generation when synchronize option is set to false", function () {
        let connections: Connection[];
        beforeEach(() =>
            createTestingConnections({
                entities: [View],
                dropSchema: true,
            }).then((all) => (connections = all))
        );
        afterEach(() => closeTestingConnections(connections));
        it("database should be empty after schema sync", () =>
            Promise.all(
                connections.map(async (connection) => {
                    await connection.synchronize(true);
                    const queryRunner = connection.createQueryRunner();
                    const schema = await queryRunner.getTables(["view"]);
                    await queryRunner.release();
                    expect(schema.some((table) => table.name === "view")).to.be
                        .false;
                })
            ));
    });

    describe("different names of the same content of the schema", () => {
        let connections: Connection[];
        beforeEach(async () => {
            const connections1 = await createTestingConnections({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [CommentV1, GuestV1],
                schema: "test-schema",
                dropSchema: true,
            });
            const connections2 = await createTestingConnections({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [CommentV1, GuestV1],
                schema: "another-schema",
                dropSchema: true,
            });
            connections = [...connections1, ...connections2];
        });
        after(() => closeTestingConnections(connections));

        it("should not interfere with each other", async () => {
            await PromiseUtils.runInSequence(connections, (c) =>
                c.synchronize()
            );
            await closeTestingConnections(connections);
            const connections1 = await createTestingConnections({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [CommentV2, GuestV2],
                schema: "test-schema",
                dropSchema: false,
                schemaCreate: true,
            });
            const connections2 = await createTestingConnections({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [CommentV2, GuestV2],
                schema: "another-schema",
                dropSchema: false,
                schemaCreate: true,
            });
            connections = [...connections1, ...connections2];
        });
    });

    describe("can change postgres default schema name", () => {
        let connections: Connection[];
        beforeEach(async () => {
            const connections1 = await createTestingConnections({
                name: "test",
                enabledDrivers: ["postgres"],
                entities: [CommentV1, GuestV1],
                schema: "test-schema",
                dropSchema: true,
            });
            const connections2 = await createTestingConnections({
                name: "another",
                enabledDrivers: ["postgres"],
                entities: [CommentV1, GuestV1],
                schema: "another-schema",
                dropSchema: true,
            });
            connections = [...connections1, ...connections2];
        });
        afterEach(() => closeTestingConnections(connections));

        it("schema name can be set", () => {
            return Promise.all(
                connections.map(async (connection) => {
                    await connection.synchronize(true);
                    const schemaName = (connection.driver
                        .options as PostgresConnectionOptions).schema;
                    const comment = new CommentV1();
                    comment.title = "Change SchemaName";
                    comment.context = `To ${schemaName}`;

                    const commentRepo = connection.getRepository(CommentV1);
                    await commentRepo.save(comment);

                    const queryRunner = connection.createQueryRunner();
                    const rows = await queryRunner.query(
                        `select * from "${schemaName}"."comment" where id = $1`,
                        [comment.id]
                    );
                    await queryRunner.release();
                    expect(rows[0].context).to.be.eq(comment.context);
                })
            );
        });
    });
});
