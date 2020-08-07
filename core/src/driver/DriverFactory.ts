import { MissingDriverError } from "../error/MissingDriverError";
import { CockroachDriver } from "./cockroachdb/CockroachDriver";
import { MongoDriver } from "./mongodb/MongoDriver";
import { SqlServerDriver } from "./sqlserver/SqlServerDriver";
import { OracleDriver } from "./oracle/OracleDriver";
import { SqliteDriver } from "./sqlite/SqliteDriver";
import { CordovaDriver } from "./cordova/CordovaDriver";
import { ReactNativeDriver } from "./react-native/ReactNativeDriver";
import { NativescriptDriver } from "./nativescript/NativescriptDriver";
import { SqljsDriver } from "./sqljs/SqljsDriver";
import { MysqlDriver } from "./mysql/MysqlDriver";
import {
    PostgresDriver,
    AuroraDataApiPostgresDriver,
} from "./postgres/PostgresDriver";
import { ExpoDriver } from "./expo/ExpoDriver";
import { AuroraDataApiDriver } from "./aurora-data-api/AuroraDataApiDriver";
import { Driver } from "./Driver";
import { Connection } from "../connection/Connection";
import { SapDriver } from "./sap/SapDriver";
import { ConnectionOptions } from "../connection/ConnectionOptions";
import { MysqlConnectionOptions } from "./mysql/MysqlConnectionOptions";
import { PostgresConnectionOptions } from "./postgres/PostgresConnectionOptions";
import { CockroachConnectionOptions } from "./cockroachdb/CockroachConnectionOptions";
import { SapConnectionOptions } from "./sap/SapConnectionOptions";
import { SqliteConnectionOptions } from "./sqlite/SqliteConnectionOptions";
import { NativescriptConnectionOptions } from "./nativescript/NativescriptConnectionOptions";
import { OracleConnectionOptions } from "./oracle/OracleConnectionOptions";
import { SqlServerConnectionOptions } from "./sqlserver/SqlServerConnectionOptions";
import { MongoConnectionOptions } from "./mongodb/MongoConnectionOptions";
import { AuroraDataApiConnectionOptions } from "./aurora-data-api/AuroraDataApiConnectionOptions";
import { AuroraDataApiPostgresConnectionOptions } from "./aurora-data-api-pg/AuroraDataApiPostgresConnectionOptions";
import { ReactNativeConnectionOptions } from './react-native/ReactNativeConnectionOptions';
import { SqljsConnectionOptions } from './sqljs/SqljsConnectionOptions';
import { ExpoConnectionOptions } from './expo/ExpoConnectionOptions';

/**
 * Helps to create drivers.
 */
export class DriverFactory {
    /**
     * Creates a new driver depend on a given connection's driver type.
     */
    create(
        connection: Connection,
        connectionOptions: ConnectionOptions
    ): Driver {
        const {type} = connectionOptions;
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
                return new ReactNativeDriver(connection,
                    connectionOptions as ReactNativeConnectionOptions);
            case "sqljs":
                return new SqljsDriver(connection,
                    connectionOptions as SqljsConnectionOptions);
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
                return new ExpoDriver(connection,
                    connectionOptions as ExpoConnectionOptions);
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
}
