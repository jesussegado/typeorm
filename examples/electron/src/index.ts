import { createConnection } from "typeorm-core";
import electron from "electron";
import url from "url";
import path from "path";
import { SqliteConnectionOptions } from "typeorm-core/build/compiled/src/driver/sqlite/SqliteConnectionOptions";
import { SqliteDriver } from "typeorm-core/build/compiled/src/driver/sqlite/SqliteDriver";

electron.app.on("ready", async () => {
    const mainWindow = new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    await mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
    );
    console.log("You can also get posts from the second process:");
    const connection = await createConnection(
        {
            connectionOptions: {
                type: "sqlite",
                database: "database.sqlite",
            },
            typeORMOptions: {
                synchronize: true,
                logging: true,
                logger: "simple-console",
                entities: ["src/entity/*.js"],
            },
        },
        (connection, options) =>
            new SqliteDriver(connection, options as SqliteConnectionOptions)
    );
    const posts = await connection.getRepository("Post").find();
    console.log("posts:", posts);

    console.warn("main process success");
});
