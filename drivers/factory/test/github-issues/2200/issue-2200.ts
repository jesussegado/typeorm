import "reflect-metadata";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Booking } from "./entity/Booking";
import { NamingStrategyUnderTest } from "./naming/NamingStrategyUnderTest";

describe("github issue > #2200 Bug - Issue with snake_case naming strategy", () => {
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

    it("Renammed alias allow to query correctly", () =>
        Promise.all(
            connections.map(async (connection) => {
                await connection.getRepository(Booking).find({ take: 10 });
            })
        ));
});
