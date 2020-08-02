"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const spectron_1 = require("spectron");
const assert_1 = tslib_1.__importDefault(require("assert"));
const path_1 = tslib_1.__importDefault(require("path"));
const electronPath = require("electron");
let app;
describe("Connects to database", function () {
    this.timeout(10000);
    beforeEach(function () {
        app = new spectron_1.Application({
            // Your electron path can be any binary
            // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
            // But for the sake of the example we fetch it from our node_modules.
            path: electronPath,
            // Assuming you have the following directory structure
            //  |__ my project
            //     |__ ...
            //     |__ main.js
            //     |__ package.json
            //     |__ index.html
            //     |__ ...
            //     |__ test
            //        |__ spec.js  <- You are here! ~ Well you should be.
            // The following line tells spectron to look and use the main.js file
            // and the package.json located 1 level above.
            args: [path_1.default.join(__dirname, "../src")],
        });
        return app.start();
    });
    afterEach(async function () {
        if (app && app.isRunning()) {
            await app.stop();
        }
    });
    it("connects from renderer and main process", async function () {
        const mainLogs = await app.client.getMainProcessLogs();
        const rendererSuccess = mainLogs.some((line) => {
            return line.includes("renderer success");
        });
        assert_1.default.equal(rendererSuccess, true);
        const mainProcessSuccess = mainLogs.some((line) => {
            return line.includes("main process success");
        });
        assert_1.default.equal(mainProcessSuccess, true);
    });
});
//# sourceMappingURL=index.js.map