import { expect } from "chai";
import { writeFileSync, unlinkSync } from "fs";
import { LoggerFactory } from "typeorm-core/build/compiled/src/logger/LoggerFactory";
import { importClassesFromDirectories } from "typeorm-core/build/compiled/src/util/DirectoryExportedClassesLoader";
import { TypeormAndConnectionOptionsReader } from "../../../src";

describe("cli support for cjs extension", () => {
    it("will load a cjs file", async () => {
        const cjsConfigPath = [__dirname, "ormconfig.cjs"].join("/");
        const databaseType = "postgres";
        const config = `module.exports = { "connectionOptions": { "type": "${databaseType}"} };`;

        writeFileSync(cjsConfigPath, config);
        const reader = new TypeormAndConnectionOptionsReader({
            root: __dirname,
        });

        const results = await reader.all();
        expect(results).to.be.an("Array");
        expect(results[0]).to.be.an("Object");
        expect(results[0].connectionOptions.type).to.equal(databaseType);

        unlinkSync(cjsConfigPath);
    });

    it("loads cjs files via DirectoryExportedClassesloader", () => {
        const klassPath = [__dirname, "klass.cjs"].join("/");
        const klass = `module.exports.Widget = class Widget {};`;
        writeFileSync(klassPath, klass);

        const classes = importClassesFromDirectories(
            new LoggerFactory().create(),
            [`${__dirname}/*.cjs`]
        );
        expect(classes).to.be.an("Array");
        expect(classes.length).to.eq(1);

        unlinkSync(klassPath);
    });
});
