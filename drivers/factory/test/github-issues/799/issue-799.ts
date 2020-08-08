import "reflect-metadata";
import * as assert from "assert";
import rimraf from "rimraf";
import { dirname } from "path";
import { createConnection } from "typeorm-core";
import { Connection } from "typeorm-core";
import { createDriver } from '../../../src';

describe("github issues > #799 sqlite: 'database' path should be created", () => {
    let connection: Connection;

    const path = `${__dirname}/tmp/sqlitedb.db`;
    const cleanup = (done: () => void) => {
        rimraf(dirname(path), () => {
            return done();
        });
    };

    before(cleanup);
    after(cleanup);

    afterEach(async () => {
        if (connection && connection.isConnected) {
            await connection.close();
        }
    });

    it("should create the whole path to database file", async function () {
        connection = await createConnection({
            connectionOptions: {
                type: "sqlite",
                database: path,
            },
            typeORMOptions: {
                name: "sqlite",
            },
        }, createDriver);

        assert.strictEqual(connection.isConnected, true);
    });
});
