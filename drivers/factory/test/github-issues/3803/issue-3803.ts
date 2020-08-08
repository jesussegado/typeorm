import { expect } from "chai";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Connection, EntitySchema } from "typeorm-core";

import { Post, PostSchema } from "./entity/Post";
import { isDriverSupported } from 'typeorm-core/build/compiled/src/driver/Driver';

describe("github issues > #3803 column option unique sqlite error", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [new EntitySchema<Post>(PostSchema)],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should create unique constraints defined in EntitySchema", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("post");
                await queryRunner.release();

                // MySQL stores unique constraints as unique indices
                if (
                    isDriverSupported(["mysql", "sap"], connection.driver.type)
                ) {
                    expect(table!.indices.length).to.be.equal(1);
                    expect(table!.indices[0].isUnique).to.be.true;
                    expect(table!.indices[0].columnNames[0]).to.be.equal(
                        "name"
                    );
                } else {
                    expect(table!.uniques.length).to.be.equal(1);
                    expect(table!.uniques[0].columnNames[0]).to.be.equal(
                        "name"
                    );
                }
            })
        ));
});
