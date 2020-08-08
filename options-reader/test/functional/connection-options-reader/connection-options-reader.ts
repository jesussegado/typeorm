import { expect } from "chai";
import { TypeormAndConnectionOptions } from "typeorm-core";
import { TypeormAndConnectionOptionsReader } from '../../../src';

describe("ConnectionOptionsReader", () => {
    after(() => {
        delete process.env.TYPEORM_CONNECTION;
        delete process.env.TYPEORM_DATABASE;
    });

    it("properly loads config with entities specified", async () => {
        type EntititesList = Function[] | string[];
        const connectionOptionsReader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
            configName: "configs/class-entities",
        });
        const options: TypeormAndConnectionOptions = await connectionOptionsReader.get(
            "test-conn"
        );
        expect(options.typeORMOptions.entities).to.be.an.instanceOf(Array);
        const entities: EntititesList = options.typeORMOptions
            .entities as EntititesList;
        expect(entities.length).to.equal(1);
    });

    it("properly loads sqlite in-memory/path config", async () => {
        const connectionOptionsReader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
            configName: "configs/sqlite-memory",
        });
        const inmemoryOptions: TypeormAndConnectionOptions = await connectionOptionsReader.get(
            "memory"
        );
        expect(inmemoryOptions.connectionOptions.database).to.equal(":memory:");
        const fileOptions: TypeormAndConnectionOptions = await connectionOptionsReader.get(
            "file"
        );
        expect(fileOptions.connectionOptions.database).to.have.string("/test");
    });

    it("properly loads config with specified file path", async () => {
        const connectionOptionsReader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
            configName: "configs/test-path-config.js",
        });
        const fileOptions: TypeormAndConnectionOptions = await connectionOptionsReader.get(
            "file"
        );
        expect(fileOptions.connectionOptions.database).to.have.string(
            "/test-js"
        );
    });

    it("properly loads asynchronous config with specified file path", async () => {
        const connectionOptionsReader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
            configName: "configs/test-path-config-async.js",
        });
        const fileOptions: TypeormAndConnectionOptions = await connectionOptionsReader.get(
            "file"
        );
        expect(fileOptions.connectionOptions.database).to.have.string(
            "/test-js-async"
        );
    });

    // TODO This test requires the configs/.env file be moved to the matching directory in build/compiled
    it.skip("properly loads config from .env file", async () => {
        const connectionOptionsReader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
            configName: "configs/.env",
        });
        const [
            fileOptions,
        ]: TypeormAndConnectionOptions[] = await connectionOptionsReader.all();
        expect(fileOptions.connectionOptions.database).to.have.string(
            "test-js"
        );
        expect(process.env.TYPEORM_DATABASE).to.equal("test-js");
    });
});
