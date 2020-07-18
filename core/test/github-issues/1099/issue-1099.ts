import "reflect-metadata";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Connection } from "../../../src/connection/Connection";
import { Animal } from "./entity/Animal";
import { OffsetWithoutLimitNotSupportedError } from "../../../src/error/OffsetWithoutLimitNotSupportedError";
import { isDriverSupported } from "../../../src/driver/Driver";

describe("github issues > #1099 BUG - QueryBuilder MySQL skip sql is wrong", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("drivers which does not support offset without limit should throw an exception, other drivers must work fine", () =>
        Promise.all(
            connections.map(async (connection) => {
                const animals = ["cat", "dog", "bear", "snake"];
                for (const animal of animals) {
                    await connection
                        .getRepository(Animal)
                        .save({ name: animal });
                }

                const qb = connection
                    .getRepository(Animal)
                    .createQueryBuilder("a")
                    .leftJoinAndSelect("a.categories", "categories")
                    .orderBy("a.id")
                    .skip(1);

                if (
                    isDriverSupported(
                        ["mysql", "aurora-data-api", "sap"],
                        connection.driver.type
                    )
                ) {
                    await qb
                        .getManyAndCount()
                        .should.be.rejectedWith(
                            OffsetWithoutLimitNotSupportedError
                        );
                } else {
                    await qb.getManyAndCount().should.eventually.be.eql([
                        [
                            { id: 2, name: "dog", categories: [] },
                            { id: 3, name: "bear", categories: [] },
                            { id: 4, name: "snake", categories: [] },
                        ],
                        4,
                    ]);
                }
            })
        ));
});
