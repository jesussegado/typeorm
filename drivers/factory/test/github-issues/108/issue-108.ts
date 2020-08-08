import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
} from "../../utils/test-utils";

describe("github issues > #108 Error with constraint names on postgres", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                schemaCreate: true,
                dropSchema: true,
            }))
    );
    after(() => closeTestingConnections(connections));

    it("should sync even when there unqiue constraints placed on similarly named columns", () =>
        Promise.all(
            connections.map(async (connection) => {
                // By virtue that we got here means that it must have worked.
                expect(true).is.true;
            })
        ));
});
