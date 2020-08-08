import "reflect-metadata";
import { expect } from "chai";
import {
    createTestingConnections,
    closeTestingConnections,
} from "../../utils/test-utils";
import { Session } from "./entity/Session";
import { Connection, QueryFailedError } from 'typeorm-core';

describe("github issues > #6066 Column comment string is not escaped during synchronization", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [Session],
                enabledDrivers: ["mysql", "mariadb"],
                schemaCreate: false,
                dropSchema: true,
            }))
    );
    after(() => closeTestingConnections(connections));

    it("should synchronize", () =>
        Promise.all(
            connections.map((connection) => {
                return expect(connection.synchronize()).to.not.be.rejectedWith(
                    QueryFailedError
                );
            })
        ));
});
