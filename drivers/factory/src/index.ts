import { Connection, Driver } from "typeorm-core";
import { AuroraDataApiDriver } from "typeorm-core/build/compiled/src/driver/aurora-data-api/AuroraDataApiDriver";
import { MissingDriverError } from "typeorm-core/build/compiled/src/error/MissingDriverError";
import { SapDriver } from "typeorm-core/build/compiled/src/driver/sap/SapDriver";
import { SqliteDriver } from "typeorm-core/build/compiled/src/driver/sqlite/SqliteDriver";
import { CordovaDriver } from "typeorm-core/build/compiled/src/driver/cordova/CordovaDriver";
import { NativescriptDriver } from "typeorm-core/build/compiled/src/driver/nativescript/NativescriptDriver";
import { ReactNativeDriver } from "typeorm-core/build/compiled/src/driver/react-native/ReactNativeDriver";
import { ExpoDriver } from "typeorm-core/build/compiled/src/driver/expo/ExpoDriver";
import {
    ConnectionOptions,
    MysqlConnectionOptions,
    PostgresConnectionOptions,
    CockroachConnectionOptions,
    SapConnectionOptions,
    SqliteConnectionOptions,
    NativescriptConnectionOptions,
    ReactNativeConnectionOptions,
    SqljsConnectionOptions,
    OracleConnectionOptions,
    SqlServerConnectionOptions,
    MongoConnectionOptions,
    ExpoConnectionOptions,
    AuroraDataApiConnectionOptions,
    AuroraDataApiPostgresConnectionOptions,
} from "typeorm-base";
import { MysqlDriver } from "typeorm-core/build/compiled/src/driver/mysql/MysqlDriver";
import { OracleDriver } from "typeorm-core/build/compiled/src/driver/oracle/OracleDriver";
import { SqlServerDriver } from "typeorm-core/build/compiled/src/driver/sqlserver/SqlServerDriver";
import { MongoDriver } from "typeorm-driver-mongodb";
import { SqljsDriver } from "typeorm-driver-sqljs";
import { CockroachDriver } from "typeorm-driver-cockroachdb";
import {
    PostgresDriver,
    AuroraDataApiPostgresDriver,
} from "typeorm-driver-postgres";
/**
 * Creates a new driver depend on a given connection's driver type.
 */

export function createDriver(
    connection: Connection,
    connectionOptions: ConnectionOptions
): Driver {
    const { type } = connectionOptions;
    switch (type) {
        case "mysql":
            return new MysqlDriver(
                connection,
                connectionOptions as MysqlConnectionOptions
            );
        case "postgres":
            return new PostgresDriver(
                connection,
                connectionOptions as PostgresConnectionOptions
            );
        case "cockroachdb":
            return new CockroachDriver(
                connection,
                connectionOptions as CockroachConnectionOptions
            );
        case "sap":
            return new SapDriver(
                connection,
                connectionOptions as SapConnectionOptions
            );
        case "mariadb":
            return new MysqlDriver(
                connection,
                connectionOptions as MysqlConnectionOptions
            );
        case "sqlite":
            return new SqliteDriver(
                connection,
                connectionOptions as SqliteConnectionOptions
            );
        case "cordova":
            return new CordovaDriver(connection);
        case "nativescript":
            return new NativescriptDriver(
                connection,
                connectionOptions as NativescriptConnectionOptions
            );
        case "react-native":
            return new ReactNativeDriver(
                connection,
                connectionOptions as ReactNativeConnectionOptions
            );
        case "sqljs":
            return new SqljsDriver(
                connection,
                connectionOptions as SqljsConnectionOptions
            );
        case "oracle":
            return new OracleDriver(
                connection,
                connectionOptions as OracleConnectionOptions
            );
        case "mssql":
            return new SqlServerDriver(
                connection,
                connectionOptions as SqlServerConnectionOptions
            );
        case "mongodb":
            return new MongoDriver(
                connection,
                connectionOptions as MongoConnectionOptions
            );
        case "expo":
            return new ExpoDriver(
                connection,
                connectionOptions as ExpoConnectionOptions
            );
        case "aurora-data-api":
            return new AuroraDataApiDriver(
                connection,
                connectionOptions as AuroraDataApiConnectionOptions
            );
        case "aurora-data-api-pg":
            return new AuroraDataApiPostgresDriver(
                connection,
                connectionOptions as AuroraDataApiPostgresConnectionOptions
            );
        default:
            throw new MissingDriverError(type);
    }
}
