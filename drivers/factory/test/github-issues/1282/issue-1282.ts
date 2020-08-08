import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { ColumnMetadata } from "typeorm-core/build/compiled/src/metadata/ColumnMetadata";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Animal } from "./entity/Animal";
import { NamingStrategyUnderTest } from "./naming/NamingStrategyUnderTest";

describe("github issue > #1282 FEATURE REQUEST - Naming strategy joinTableColumnName if it is called from the owning or owned (inverse) context ", () => {
    let connections: Connection[];
    const namingStrategy = new NamingStrategyUnderTest();

    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                namingStrategy,
            }))
    );
    beforeEach(() => {
        return reloadTestingDatabases(connections);
    });
    after(() => closeTestingConnections(connections));

    it("NamingStrategyUnderTest#", () =>
        Promise.all(
            connections.map(async (connection) => {
                await connection.getRepository(Animal).find();

                const metadata = connection.getManyToManyMetadata(
                    Animal,
                    "categories"
                );

                let columns: ColumnMetadata[];
                if (metadata !== undefined) {
                    columns = metadata.columns;
                } else {
                    columns = [];
                }

                expect(
                    columns.find(
                        (column: ColumnMetadata) =>
                            column.databaseName === "animalIdForward"
                    )
                ).not.to.be.undefined;

                expect(
                    columns.find(
                        (column: ColumnMetadata) =>
                            column.databaseName === "categoryIdInverse"
                    )
                ).not.to.be.undefined;
            })
        ));
});
