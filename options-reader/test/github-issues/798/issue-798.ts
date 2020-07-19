import "reflect-metadata";
import * as assert from "assert";
import { Connection, createConnection } from "typeorm-core";
import { getConnectionOptions } from "../../../src";

describe("github issues > #798 sqlite: 'database' path in ormconfig.json is not relative", () => {
    let connection: Connection;
    const oldCwd = process.cwd();

    before(function () {
        process.chdir("..");
    });

    after(function () {
        process.chdir(oldCwd);
    });

    afterEach(async () => {
        if (connection && connection.isConnected) {
            await connection.close();
        }
    });

    it("should find the sqlite database if the cwd is changed", async function () {
        const options = await getConnectionOptions("sqlite");
        connection = await createConnection(options);

        assert.strictEqual(connection.isConnected, true);
    });
});
