import "reflect-metadata";
import { PromiseUtils } from "typeorm-base";
import { Connection } from "typeorm-core";
import { ExclusionMetadata } from "typeorm-core/build/compiled/src/metadata/ExclusionMetadata";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Teacher } from "./entity/Teacher";
import { Post } from "./entity/Post";

describe("schema builder > change exclusion constraint", () => {
    let connections: Connection[];
    before(async () => {
        connections = await createTestingConnections({
            entities: [`${__dirname}/entity/*{.js,.ts}`],
            enabledDrivers: ["postgres"], // Only PostgreSQL supports exclusion constraints.
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should correctly add new exclusion constraint", () =>
        PromiseUtils.runInSequence(connections, async (connection) => {
            const teacherMetadata = connection.getMetadata(Teacher);
            const exclusionMetadata = new ExclusionMetadata({
                entityMetadata: teacherMetadata,
                args: {
                    target: Teacher,
                    expression: `USING gist ("name" WITH =)`,
                },
            });
            exclusionMetadata.build(connection.namingStrategy);
            teacherMetadata.exclusions.push(exclusionMetadata);

            await connection.synchronize();

            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("teacher");
            await queryRunner.release();

            table!.exclusions.length.should.be.equal(1);
        }));

    it("should correctly change exclusion", () =>
        PromiseUtils.runInSequence(connections, async (connection) => {
            const postMetadata = connection.getMetadata(Post);
            postMetadata.exclusions[0].expression = `USING gist ("tag" WITH =)`;
            postMetadata.exclusions[0].build(connection.namingStrategy);

            await connection.synchronize();

            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("post");
            await queryRunner.release();

            table!.exclusions[0]
                .expression!.indexOf("tag")
                .should.be.not.equal(-1);
        }));

    it("should correctly drop removed exclusion", () =>
        PromiseUtils.runInSequence(connections, async (connection) => {
            const postMetadata = connection.getMetadata(Post);
            postMetadata.exclusions = [];

            await connection.synchronize();

            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("post");
            await queryRunner.release();

            table!.exclusions.length.should.be.equal(0);
        }));
});
