import { NativescriptConnectionOptions } from "typeorm-base";
import { DriverType } from "typeorm-core/build/compiled/src/driver/Driver";
import { AbstractSqliteDriver } from "typeorm-core/build/compiled/src/driver/sqlite-abstract/AbstractSqliteDriver";
import { DriverOptionNotSetError } from "typeorm-core/build/compiled/src/error/DriverOptionNotSetError";
import { DriverPackageNotInstalledError } from "typeorm-core/build/compiled/src/error/DriverPackageNotInstalledError";
import { Connection, QueryRunner, ColumnType } from "typeorm-core";
import { NativescriptQueryRunner } from "./NativescriptQueryRunner";

/**
 * Organizes communication with sqlite DBMS within Nativescript.
 */
export class NativescriptDriver extends AbstractSqliteDriver {
    type: DriverType = "nativescript";

    /**
     * Connection options.
     */
    options: NativescriptConnectionOptions;

    /**
     * Nativescript driver module
     * this is most likely `nativescript-sqlite`
     * but user can pass his own
     */
    driver: any;

    constructor(
        connection: Connection,
        connectionOptions: NativescriptConnectionOptions
    ) {
        super(connection);

        this.connection = connection;
        this.options = connectionOptions;
        this.database = this.options.database;
        this.driver = this.options.driver;

        // validate options to make sure everything is set
        if (!this.options.database) {
            throw new DriverOptionNotSetError("database");
        }

        // load sqlite package
        this.loadDependencies();
    }

    /**
     * Closes connection with database.
     */
    async disconnect(): Promise<void> {
        return new Promise<void>((ok, fail) => {
            this.queryRunner = undefined;
            this.databaseConnection.close().then(ok).catch(fail);
        });
    }

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: "master" | "slave" = "master"): QueryRunner {
        if (!this.queryRunner) {
            this.queryRunner = new NativescriptQueryRunner(this);
        }

        return this.queryRunner;
    }

    normalizeType(column: {
        type?: ColumnType;
        length?: number | string;
        precision?: number | null;
        scale?: number;
    }): string {
        if ((column.type as any) === Buffer) {
            return "blob";
        }

        return super.normalizeType(column);
    }

    /**
     * Creates connection with the database.
     */
    protected createDatabaseConnection() {
        return new Promise<void>((ok, fail) => {
            const options = {
                readOnly: this.options.readOnly,
                key: this.options.key,
                multithreading: this.options.multithreading,
                migrate: this.options.migrate,
                iosFlags: this.options.iosFlags,
                androidFlags: this.options.androidFlags,
                ...(this.options.extra || {}),
            };

            this.sqlite(
                this.options.database,
                options,
                (err: Error, db: any): any => {
                    if (err) return fail(err);

                    // use object mode to work with TypeORM
                    db.resultType(this.sqlite.RESULTSASOBJECT);

                    // we need to enable foreign keys in sqlite to make sure all foreign key related features
                    // working properly. this also makes onDelete work with sqlite.
                    db.execSQL(
                        `PRAGMA foreign_keys = ON;`,
                        [],
                        (err: Error, result: any): any => {
                            if (err) return fail(err);
                            // We are all set
                            ok(db);
                        }
                    );
                }
            );
        });
    }

    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    protected loadDependencies(): void {
        this.sqlite = this.driver;
        if (!this.driver) {
            throw new DriverPackageNotInstalledError(
                "Nativescript",
                "nativescript-sqlite"
            );
        }
    }
}
