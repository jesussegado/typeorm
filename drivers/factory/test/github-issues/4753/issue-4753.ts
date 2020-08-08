import { getConnectionManager } from "typeorm-core";
import { Connection } from "typeorm-core";
import { closeTestingConnections } from "../../utils/test-utils";
import { User } from "./entity/User";
import { createDriver } from '../../../src';

describe("github issues > #4753 MySQL Replication Config broken", () => {
    const connections: Connection[] = [];
    after(() => closeTestingConnections(connections));

    it("should connect without error when using replication", async () => {
        const connection = getConnectionManager().create({
            connectionOptions: {
                type: "mysql",
                replication: {
                    master: {
                        username: "test",
                        password: "test",
                        database: "test",
                    },
                    slaves: [
                        {
                            username: "test",
                            password: "test",
                            database: "test",
                        },
                    ],
                },
            },
            typeORMOptions: {
                entities: [User],
            },
        }, createDriver);
        connections.push(connection);
        await connection.connect();
        connection.isConnected.should.be.true;
    });
});
