import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { PostgresConnectionOptions } from "typeorm-core/build/compiled/src/driver/postgres/PostgresConnectionOptions";
import { createDriver } from "../../../src";

describe.skip("github issues > #114 Can not be parsed correctly the URL of pg.", () => {
    let connection: Connection;
    before(() => {
        connection = new Connection(
            {
                connectionOptions: {
                    type: "postgres",
                    url: "postgres://test:test@localhost:5432/test",
                },
                typeORMOptions: {},
            },
            createDriver
        );
    });

    it("should not fail in url parser", () => {
        const options = connection.driver.options as PostgresConnectionOptions;
        expect(options.username).to.be.eq("test");
        expect(options.password).to.be.eq("test");
        expect(options.host).to.be.eq("localhost");
        expect(options.port).to.be.eq(5432);
        expect(options.database).to.be.eq("test");
    });
});
