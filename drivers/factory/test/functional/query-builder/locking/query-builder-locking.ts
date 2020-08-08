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

describe("query builder > locking", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not attach pessimistic read lock statement on query if locking is not used", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                const sql = connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .where("post.id = :id", { id: 1 })
                    .getSql();

                expect(sql.indexOf("LOCK IN SHARE MODE") === -1).to.be.true;
                expect(sql.indexOf("FOR SHARE") === -1).to.be.true;
                expect(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") === -1).to.be
                    .true;
            })
        ));

    it("should throw error if pessimistic lock used without transaction", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                return Promise.all([
                    connection
                        .createQueryBuilder(PostWithVersion, "post")
                        .setLock("pessimistic_read")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(
                            PessimisticLockTransactionRequiredError
                        ),

                    connection
                        .createQueryBuilder(PostWithVersion, "post")
                        .setLock("pessimistic_write")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
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
                        ["sqlite-abstract", "sap", "cockroachdb"],
                        connection.driver.type
                    )
                )
                    return;

                return connection.manager.transaction((entityManager) => {
                    return Promise.all([
                        entityManager
                            .createQueryBuilder(PostWithVersion, "post")
                            .setLock("pessimistic_read")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected,

                        entityManager
                            .createQueryBuilder(PostWithVersion, "post")
                            .setLock("pessimistic_write")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected,
                    ]);
                });
            })
        ));

    it("should throw error if for no key update lock used without transaction", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (isDriverSupported(["postgres"], connection.driver.type)) {
                    return connection
                        .createQueryBuilder(PostWithVersion, "post")
                        .setLock("for_no_key_update")
                        .where("post.id = :id", { id: 1 })
                        .getOne()
                        .should.be.rejectedWith(
                            PessimisticLockTransactionRequiredError
                        );
                }
                return;
            })
        ));

    it("should not throw error if for no key update lock used with transaction", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (isDriverSupported(["postgres"], connection.driver.type)) {
                    return connection.manager.transaction((entityManager) => {
                        return Promise.all([
                            entityManager
                                .createQueryBuilder(PostWithVersion, "post")
                                .setLock("for_no_key_update")
                                .where("post.id = :id", { id: 1 })
                                .getOne().should.not.be.rejected,
                        ]);
                    });
                }
                return;
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

                const sql = connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("pessimistic_read")
                    .where("post.id = :id", { id: 1 })
                    .getSql();

                if (isDriverSupported(["mysql"], connection.driver.type)) {
                    expect(sql.indexOf("LOCK IN SHARE MODE") !== -1).to.be.true;
                } else if (
                    isDriverSupported(["postgres"], connection.driver.type)
                ) {
                    expect(sql.indexOf("FOR SHARE") !== -1).to.be.true;
                } else if (
                    isDriverSupported(["oracle"], connection.driver.type)
                ) {
                    expect(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
                } else if (
                    isDriverSupported(["mssql"], connection.driver.type)
                ) {
                    expect(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") !== -1).to.be
                        .true;
                }
            })
        ));

    it("should attach dirty read lock statement on query if locking enabled", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (!isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const sql = connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("dirty_read")
                    .where("post.id = :id", { id: 1 })
                    .getSql();

                expect(sql.indexOf("WITH (NOLOCK)") !== -1).to.be.true;
            })
        ));

    it("should not attach pessimistic write lock statement on query if locking is not used", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (
                    isDriverSupported(
                        ["sqlite-abstract", "sap"],
                        connection.driver.type
                    )
                )
                    return;

                const sql = connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .where("post.id = :id", { id: 1 })
                    .getSql();

                expect(sql.indexOf("FOR UPDATE") === -1).to.be.true;
                expect(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") === -1).to.be
                    .true;
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

                const sql = connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("pessimistic_write")
                    .where("post.id = :id", { id: 1 })
                    .getSql();

                if (
                    isDriverSupported(
                        ["mysql", "postgres", "oracle"],
                        connection.driver.type
                    )
                ) {
                    expect(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
                } else if (
                    isDriverSupported(["mssql"], connection.driver.type)
                ) {
                    expect(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") !== -1).to.be
                        .true;
                }
            })
        ));

    it("should not attach for no key update lock statement on query if locking is not used", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (isDriverSupported(["postgres"], connection.driver.type)) {
                    const sql = connection
                        .createQueryBuilder(PostWithVersion, "post")
                        .where("post.id = :id", { id: 1 })
                        .getSql();

                    expect(sql.indexOf("FOR NO KEY UPDATE") === -1).to.be.true;
                }
                return;
            })
        ));

    it("should attach for no key update lock statement on query if locking enabled", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (isDriverSupported(["postgres"], connection.driver.type)) {
                    const sql = connection
                        .createQueryBuilder(PostWithVersion, "post")
                        .setLock("for_no_key_update")
                        .where("post.id = :id", { id: 1 })
                        .getSql();

                    expect(sql.indexOf("FOR NO KEY UPDATE") !== -1).to.be.true;
                }
                return;
            })
        ));

    it("should throw error if optimistic lock used with getMany method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getMany()
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should throw error if optimistic lock used with getCount method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getCount()
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should throw error if optimistic lock used with getManyAndCount method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getManyAndCount()
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should throw error if optimistic lock used with getRawMany method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getRawMany()
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should throw error if optimistic lock used with getRawOne method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getRawOne()
                    .should.be.rejectedWith(OptimisticLockCanNotBeUsedError);
            })
        ));

    it("should not throw error if optimistic lock used with getOne method", () =>
        Promise.all(
            connections.map(async (connection) => {
                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected;
            })
        ));

    it.skip("should throw error if entity does not have version and update date columns", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithoutVersionAndUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .createQueryBuilder(PostWithoutVersionAndUpdateDate, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getOne()
                    .should.be.rejectedWith(NoVersionOrUpdateDateColumnError);
            })
        ));

    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual version does not equal expected version", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithVersion();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 2)
                    .where("post.id = :id", { id: 1 })
                    .getOne()
                    .should.be.rejectedWith(OptimisticLockVersionMismatchError);
            })
        ));

    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual version and expected versions are equal", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithVersion();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .createQueryBuilder(PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected;
            })
        ));

    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual updated date does not equal expected updated date", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .createQueryBuilder(PostWithUpdateDate, "post")
                    .setLock("optimistic", new Date(2017, 1, 1))
                    .where("post.id = :id", { id: 1 })
                    .getOne()
                    .should.be.rejectedWith(OptimisticLockVersionMismatchError);
            })
        ));

    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual updated date and expected updated date are equal", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (isDriverSupported(["mssql"], connection.driver.type))
                    return;

                const post = new PostWithUpdateDate();
                post.title = "New post";
                await connection.manager.save(post);

                return connection
                    .createQueryBuilder(PostWithUpdateDate, "post")
                    .setLock("optimistic", post.updateDate)
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected;
            })
        ));

    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should work if both version and update date columns applied", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new PostWithVersionAndUpdatedDate();
                post.title = "New post";
                await connection.manager.save(post);

                return Promise.all([
                    connection
                        .createQueryBuilder(
                            PostWithVersionAndUpdatedDate,
                            "post"
                        )
                        .setLock("optimistic", post.updateDate)
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,

                    connection
                        .createQueryBuilder(
                            PostWithVersionAndUpdatedDate,
                            "post"
                        )
                        .setLock("optimistic", 1)
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.not.be.rejected,
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
                                .createQueryBuilder(PostWithVersion, "post")
                                .setLock("pessimistic_read")
                                .where("post.id = :id", { id: 1 })
                                .getOne()
                                .should.be.rejectedWith(
                                    LockNotSupportedOnGivenDriverError
                                ),

                            entityManager
                                .createQueryBuilder(PostWithVersion, "post")
                                .setLock("pessimistic_write")
                                .where("post.id = :id", { id: 1 })
                                .getOne()
                                .should.be.rejectedWith(
                                    LockNotSupportedOnGivenDriverError
                                ),
                        ]);
                    });

                return;
            })
        ));

    it("should throw error if for no key update locking not supported by given driver", () =>
        Promise.all(
            connections.map(async (connection) => {
                if (!isDriverSupported(["postgres"], connection.driver.type)) {
                    return connection.manager.transaction((entityManager) => {
                        return Promise.all([
                            entityManager
                                .createQueryBuilder(PostWithVersion, "post")
                                .setLock("for_no_key_update")
                                .where("post.id = :id", { id: 1 })
                                .getOne()
                                .should.be.rejectedWith(
                                    LockNotSupportedOnGivenDriverError
                                ),
                        ]);
                    });
                }

                return;
            })
        ));
});
