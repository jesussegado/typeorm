import {
    MysqlConnectionOptions,
    PostgresConnectionOptions,
    CockroachConnectionOptions,
    SqliteConnectionOptions,
    SqlServerConnectionOptions,
    SapConnectionOptions,
    OracleConnectionOptions,
    CordovaConnectionOptions,
    NativescriptConnectionOptions,
    ReactNativeConnectionOptions,
    SqljsConnectionOptions,
    MongoConnectionOptions,
    AuroraDataApiConnectionOptions,
    AuroraDataApiPostgresConnectionOptions,
    ExpoConnectionOptions,
} from "..";

/**
 * ConnectionOptions is an interface with settings and options for specific connection.
 * Options contain database and other connection-related settings.
 * Consumer must provide connection options for each of your connections.
 */
export type ConnectionOptions =
    | MysqlConnectionOptions
    | PostgresConnectionOptions
    | CockroachConnectionOptions
    | SqliteConnectionOptions
    | SqlServerConnectionOptions
    | SapConnectionOptions
    | OracleConnectionOptions
    | CordovaConnectionOptions
    | NativescriptConnectionOptions
    | ReactNativeConnectionOptions
    | SqljsConnectionOptions
    | MongoConnectionOptions
    | AuroraDataApiConnectionOptions
    | AuroraDataApiPostgresConnectionOptions
    | ExpoConnectionOptions;
