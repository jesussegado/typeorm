import { CordovaConnectionOptions } from "typeorm-base";
import { Connection, QueryRunner } from "typeorm-core";
import { DriverType } from "typeorm-core/build/compiled/src/driver/Driver";
import { AbstractSqliteDriver } from "typeorm-core/build/compiled/src/driver/sqlite-abstract/AbstractSqliteDriver";
import { DriverOptionNotSetError } from "typeorm-core/build/compiled/src/error/DriverOptionNotSetError";
import { DriverPackageNotInstalledError } from "typeorm-core/build/compiled/src/error/DriverPackageNotInstalledError";
import { CordovaQueryRunner } from "./CordovaQueryRunner";
// needed for typescript compiler
interface Window {
    sqlitePlugin: any;
}

declare let window: Window;

export class CordovaDriver extends AbstractSqliteDriver {
    type: DriverType = "cordova";

    options: CordovaConnectionOptions;

    constructor(connection: Connection) {
        super(connection);

        // this.connection = connection;
        // this.options = connection.options as CordovaConnectionOptions;
        this.database = this.options.database;

        // validate options to make sure everything is set
        if (!this.options.database)
            throw new DriverOptionNotSetError("database");

        if (!this.options.location)
            throw new DriverOptionNotSetError("location");

        // load sqlite package
        this.loadDependencies();
    }

    /**
     * Closes connection with database.
     */
    async disconnect(): Promise<void> {
        return new Promise<void>((ok, fail) => {
            this.queryRunner = undefined;
            this.databaseConnection.close(ok, fail);
        });
    }

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: "master" | "slave" = "master"): QueryRunner {
        if (!this.queryRunner) this.queryRunner = new CordovaQueryRunner(this);

        return this.queryRunner;
    }

    /**
     * Creates connection with the database.
     */
    protected createDatabaseConnection() {
        return new Promise<void>((ok, fail) => {
            const options = {
                name: this.options.database,
                location: this.options.location,
                ...(this.options.extra || {}),
            };

            this.sqlite.openDatabase(
                options,
                (db: any) => {
                    const databaseConnection = db;

                    // we need to enable foreign keys in sqlite to make sure all foreign key related features
                    // working properly. this also makes onDelete to work with sqlite.
                    databaseConnection.executeSql(
                        `PRAGMA foreign_keys = ON;`,
                        [],
                        (result: any) => {
                            ok(databaseConnection);
                        },
                        (error: any) => {
                            fail(error);
                        }
                    );
                },
                (error: any) => {
                    fail(error);
                }
            );
        });
    }

    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    protected loadDependencies(): void {
        try {
            this.sqlite = window.sqlitePlugin;
        } catch (e) {
            throw new DriverPackageNotInstalledError(
                "Cordova-SQLite",
                "cordova-sqlite-storage"
            );
        }
    }
}
