import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { OptimisticLockVersionMismatchError } from "typeorm-core/build/compiled/src/error/OptimisticLockVersionMismatchError";
import { OptimisticLockCanNotBeUsedError } from "typeorm-core/build/compiled/src/error/OptimisticLockCanNotBeUsedError";
import { NoVersionOrUpdateDateColumnError } from "typeorm-core/build/compiled/src/error/NoVersionOrUpdateDateColumnError";
import { PessimisticLockTransactionRequiredError } from "typeorm-core/build/compiled/src/error/PessimisticLockTransactionRequiredError";
import { LockNotSupportedOnGivenDriverError } from "typeorm-core/build/compiled/src/error/LockNotSupportedOnGivenDriverError";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import { PostWithVersionAndUpdatedDate } from "./entity/PostWithVersionAndUpdatedDate";
import { PostWithUpdateDate } from "./entity/PostWithUpdateDate";
import { PostWithoutVersionAndUpdateDate } from "./entity/PostWithoutVersionAndUpdateDate";
import { PostWithVersion } from "./entity/PostWithVersion";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils";

describe("repository > find options > locking", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should throw error if pessimistic lock used without transaction", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "cockroachdb", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                return Promise.all([
                    connection
                        .getRepository(PostWithVersion)
                        .findOne(1, { lock: { mode: "pessimistic_read" } })
                        .should.be.rejectedWith(
                            PessimisticLockTransactionRequiredError
                        ),

                    connection
                        .getRepository(PostWithVersion)
                        .findOne(1, { lock: { mode: "pessimistic_write" } })
                        .should.be.rejectedWith(
                            PessimisticLockTransactionRequiredError
                        ),
                ]);
            })
        ));

    it("should not throw error if pessimistic lock used with transaction", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "cockroachdb", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                return connection.manager.transaction((entityManager) => {
                    return Promise.all([
                        entityManager
                            .getRepository(PostWithVersion)
                            .findOne(1, { lock: { mode: "pessimistic_read" } })
                            .should.not.be.rejected,

                        entityManager
                            .getRepository(PostWithVersion)
                            .findOne(1, { lock: { mode: "pessimistic_write" } })
                            .should.not.be.rejected,
                    ]);
                });
            })
        ));

    it("should attach pessimistic read lock statement on query if locking enabled", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "cockroachdb", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                const executedSql: string[] = [];

                await connection.manager.transaction((entityManager) => {
                    const originalQuery = entityManager.queryRunner!.query.bind(
                        entityManager.queryRunner
                    );
                    entityManager.queryRunner!.query = (...args) => {
                        executedSql.push(args[0]);
                        return originalQuery(...args);
                    };

                    return entityManager
                        .getRepository(PostWithVersion)
                        .findOne(1, { lock: { mode: "pessimistic_read" } });
                });

                if (isDriverSupported(["mysql"], connection.driver.type)) {
                    expect(executedSql[0].indexOf("LOCK IN SHARE MODE") !== -1)
                        .to.be.true;
                } else if (
                    isDriverSupported(["postgres"], connection.driver.type)
                ) {
                    expect(executedSql[0].indexOf("FOR SHARE") !== -1).to.be
                        .true;
                } else if (
                    isDriverSupported(["oracle"], connection.driver.type)
                ) {
                    expect(executedSql[0].indexOf("FOR UPDATE") !== -1).to.be
                        .true;
                } else if (
                    isDriverSupported(["mssql"], connection.driver.type)
                ) {
                    expect(
                        executedSql[0].indexOf("WITH (HOLDLOCK, ROWLOCK)") !==
                            -1
                    ).to.be.true;
                }
            })
        ));

    it("should attach pessimistic write lock statement on query if locking enabled", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "cockroachdb", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                const executedSql: string[] = [];

                await connection.manager.transaction((entityManager) => {
                    const originalQuery = entityManager.queryRunner!.query.bind(
                        entityManager.queryRunner
                    );
                    entityManager.queryRunner!.query = (...args) => {
                        executedSql.push(args[0]);
                        return originalQuery(...args);
                    };

                    return entityManager
                        .getRepository(PostWithVersion)
                        .findOne(1, { lock: { mode: "pessimistic_write" } });
                });

                if (
                    isDriverSupported(
                        ["mysql", "postgres", "oracle"],
                        connection.driver.type
                    )
                ) {
                    expect(executedSql[0].indexOf("FOR UPDATE") !== -1).to.be
                        .true;
                } else if (
                    isDriverSupported(["mssql"], connection.driver.type)
                ) {
                    expect(
                        executedSql[0].indexOf("WITH (UPDLOCK, ROWLOCK)") !== -1
                    ).to.be.true;
                }
            })
        ));

    it("should attach dirty read lock statement on query if locking enabled", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (!isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const executedSql: string[] = [];

                await connection.manager.transaction((entityManager) => {
                    const originalQuery = entityManager.queryRunner!.query.bind(
                        entityManager.queryRunner
                    );
                    entityManager.queryRunner!.query = (...args) => {
                        executedSql.push(args[0]);
                        return originalQuery(...args);
                    };

                    return entityManager
                        .getRepository(PostWithVersion)
                        .findOne(1, { lock: { mode: "dirty_read" } });
                });

                expect(executedSql[0].indexOf("WITH (NOLOCK)") !== -1).to.be
                    .true;
            })
        ));

    it("should throw error if optimistic lock used with `find` method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .getRepository(PostWithVersion)
                    .find({ lock: { mode: "optimistic", version: 1 } })
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should not throw error if optimistic lock used with `findOne` method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .getRepository(PostWithVersion)
                    .findOne(1, { lock: { mode: "optimistic", version: 1 } })
                    .should.not.be.rejected;
            })
        ));

    it("should throw error if entity does not have version and update date columns", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithoutVersionAndUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .getRepository(PostWithoutVersionAndUpdateDate)
                    .findOne(1, { lock: { mode: "optimistic", version: 1 } })
                    .should.be.rejectedWith(NoVersionOrUpdateDateColumnError);
            })
        ));

    it("should throw error if actual version does not equal expected version", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithVersion();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .getRepository(PostWithVersion)
                    .findOne(1, { lock: { mode: "optimistic", version: 2 } })
                    .should.be.rejectedWith(OptimisticLockVersionMismatchError);
            })
        ));

    it("should not throw error if actual version and expected versions are equal", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithVersion();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .getRepository(PostWithVersion)
                    .findOne(1, { lock: { mode: "optimistic", version: 1 } })
                    .should.not.be.rejected;
            })
        ));

    it("should throw error if actual updated date does not equal expected updated date", () =>
        Promise.all(
            connections.map(async (connection) => {
                // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
                if (isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const post = new PostWithUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .getRepository(PostWithUpdateDate)
                    .findOne(1, {
                        lock: {
                            mode: "optimistic",
                            version: new Date(2017, 1, 1),
                        },
                    })
                    .should.be.rejectedWith(OptimisticLockVersionMismatchError);
            })
        ));

    it("should not throw error if actual updated date and expected updated date are equal", () =>
        Promise.all(
            connections.map(async (connection) => {
                // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
                if (isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const post = new PostWithUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection.getRepository(PostWithUpdateDate).findOne(1, {
                    lock: { mode: "optimistic", version: post.updateDate },
                }).should.not.be.rejected;
            })
        ));

    it("should work if both version and update date columns applied", () =>
        Promise.all(
            connections.map(async (connection) => {
                // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
                if (isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const post = new PostWithVersionAndUpdatedDate();
                post.title = "New post";
                await connection.manager.save(post);

                return Promise.all([
                    connection
                        .getRepository(PostWithVersionAndUpdatedDate)
                        .findOne(1, {
                            lock: {
                                mode: "optimistic",
                                version: post.updateDate,
                            },
                        }).should.not.be.rejected,
                    connection
                        .getRepository(PostWithVersionAndUpdatedDate)
                        .findOne(1, {
                            lock: { mode: "optimistic", version: 1 },
                        }).should.not.be.rejected,
                ]);
            })
        ));

    it("should throw error if pessimistic locking not supported by given driver", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "cockroachdb", "sap"],
                        connection.driver.type
                    )
                )
                    return connection.manager.transaction((entityManager) => {
                        return Promise.all([
                            entityManager
                                .getRepository(PostWithVersion)
                                .findOne(1, {
                                    lock: { mode: "pessimistic_read" },
                                })
                                .should.be.rejectedWith(
                                    LockNotSupportedOnGivenDriverError
                                ),

                            entityManager
                                .getRepository(PostWithVersion)
                                .findOne(1, {
                                    lock: { mode: "pessimistic_write" },
                                })
                                .should.be.rejectedWith(
                                    LockNotSupportedOnGivenDriverError
                                ),
                        ]);
                    });

                return;
            })
        ));
});
