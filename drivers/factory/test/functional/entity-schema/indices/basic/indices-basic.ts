import "reflect-metadata";
import { expect } from "chai";
import { Connection, EntityMetadata } from "typeorm-core";

import { IndexMetadata } from "typeorm-core/build/compiled/src/metadata/IndexMetadata";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import { PersonSchema } from "./entity/Person";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils";

describe("entity-schema > indices > basic", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [PersonSchema as any],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should create a non unique index with 2 columns", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("person");
                await queryRunner.release();

                expect(table!.indices.length).to.be.equal(1);
                expect(table!.indices[0].name).to.be.equal("IDX_TEST");
                expect(table!.indices[0].isUnique).to.be.false;
                expect(table!.indices[0].columnNames.length).to.be.equal(2);
                expect(table!.indices[0].columnNames).to.deep.include.members([
                    "FirstName",
                    "LastName",
                ]);
            })
        ));

    it("should update the index to be unique", () =>
        Promise.all(
            connections.map(async (connection) => {
                const entityMetadata = connection.entityMetadatas.find(
                    (x) => x.name === "Person"
                );
                const indexMetadata = entityMetadata!.indices.find(
                    (x) => x.name === "IDX_TEST"
                );
                indexMetadata!.isUnique = true;

                await connection.synchronize(false);

                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("person");
                await queryRunner.release();

                // CockroachDB stores unique indices as UNIQUE constraints
                if (
                    isDriverSupported(["cockroachdb"], connection.driver.type)
                ) {
                    expect(table!.uniques.length).to.be.equal(1);
                    expect(table!.uniques[0].name).to.be.equal("IDX_TEST");
                    expect(table!.uniques[0].columnNames.length).to.be.equal(2);
                    expect(
                        table!.uniques[0].columnNames
                    ).to.deep.include.members(["FirstName", "LastName"]);
                } else {
                    expect(table!.indices.length).to.be.equal(1);
                    expect(table!.indices[0].name).to.be.equal("IDX_TEST");
                    expect(table!.indices[0].isUnique).to.be.true;
                    expect(table!.indices[0].columnNames.length).to.be.equal(2);
                    expect(
                        table!.indices[0].columnNames
                    ).to.deep.include.members(["FirstName", "LastName"]);
                }
            })
        ));

    it("should update the index swaping the 2 columns", () =>
        Promise.all(
            connections.map(async (connection) => {
                const entityMetadata = connection.entityMetadatas.find(
                    (x) => x.name === "Person"
                );
                entityMetadata!.indices = [
                    new IndexMetadata({
                        entityMetadata: entityMetadata as EntityMetadata,
                        args: {
                            target: entityMetadata!.target,
                            name: "IDX_TEST",
                            columns: ["LastName", "FirstName"],
                            unique: false,
                            synchronize: true,
                        },
                    }),
                ];
                entityMetadata!.indices.forEach((index) =>
                    index.build(connection.namingStrategy)
                );

                await connection.synchronize(false);

                const queryRunner = connection.createQueryRunner();
                const table = await queryRunner.getTable("person");
                await queryRunner.release();

                expect(table!.indices.length).to.be.equal(1);
                expect(table!.indices[0].name).to.be.equal("IDX_TEST");
                expect(table!.indices[0].isUnique).to.be.false;
                expect(table!.indices[0].columnNames.length).to.be.equal(2);
                expect(table!.indices[0].columnNames).to.deep.include.members([
                    "FirstName",
                    "LastName",
                ]);
            })
        ));
});
