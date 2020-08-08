import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

describe("multi-schema-and-database > custom-junction-database", () => {
    let connections: Connection[];
    before(async () => {
        connections = await createTestingConnections({
            entities: [Post, Category],
            enabledDrivers: ["mysql"],
        });
    });
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should correctly create tables when custom table schema used", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner();
                if (isDriverSupported(["mssql"], connection.driver.type)) {
                    const postTable = await queryRunner.getTable("yoman..post");
                    const categoryTable = await queryRunner.getTable(
                        "yoman..category"
                    );
                    const junctionMetadata = connection.getManyToManyMetadata(
                        Post,
                        "categories"
                    )!;
                    const junctionTable = await queryRunner.getTable(
                        `yoman..${junctionMetadata.tableName}`
                    );
                    expect(postTable).not.to.be.undefined;
                    postTable!.name!.should.be.equal("yoman..post");
                    expect(categoryTable).not.to.be.undefined;
                    categoryTable!.name!.should.be.equal("yoman..category");
                    expect(junctionTable).not.to.be.undefined;
                    junctionTable!.name!.should.be.equal(
                        `yoman..${junctionMetadata.tableName}`
                    );
                } else {
                    // mysql
                    const postTable = await queryRunner.getTable("yoman.post");
                    const categoryTable = await queryRunner.getTable(
                        "yoman.category"
                    );
                    const junctionMetadata = connection.getManyToManyMetadata(
                        Post,
                        "categories"
                    )!;
                    const junctionTable = await queryRunner.getTable(
                        `yoman.${junctionMetadata.tableName}`
                    );
                    expect(postTable).not.to.be.undefined;
                    postTable!.name!.should.be.equal("yoman.post");
                    expect(categoryTable).not.to.be.undefined;
                    categoryTable!.name!.should.be.equal("yoman.category");
                    expect(junctionTable).not.to.be.undefined;
                    junctionTable!.name!.should.be.equal(
                        `yoman.${junctionMetadata.tableName}`
                    );
                }
                await queryRunner.release();
            })
        ));
});
