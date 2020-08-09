import { ObjectLiteral, ConnectionOptions } from "typeorm-base";
import { QueryRunner } from "../query-runner/QueryRunner";
import { ColumnMetadata } from "../metadata/ColumnMetadata";
import { ColumnType } from "./types/ColumnTypes";
import { MappedColumnTypes } from "./types/MappedColumnTypes";
import { SchemaBuilder } from "../schema-builder/SchemaBuilder";
import { DataTypeDefaults } from "./types/DataTypeDefaults";
import { TableColumn } from "../schema-builder/table/TableColumn";
import { EntityMetadata } from "../metadata/EntityMetadata";
import { DatabaseType, Connection, EntityManager, Repository } from "..";
import type { SqljsDriver } from "./sqljs/SqljsDriver";
import type { SqlServerDriver } from "./sqlserver/SqlServerDriver";
import type { MysqlDriver } from "./mysql/MysqlDriver";
import type { AuroraDataApiDriver } from "./aurora-data-api/AuroraDataApiDriver";
import type { OracleDriver } from "./oracle/OracleDriver";

import { RdbmsMigrationExecutor } from "../migration/RdbmsMigrationExecutor";
import { MigrationExecutor } from "../migration/MigrationExecutor";

export type DriverType = DatabaseType | "sqlite-abstract";

export function isDriverSupported(
    supportedDrivers: DriverType[],
    driver: DriverType
): boolean {
    const abstractSqlite: DriverType[] = [
        "cordova",
        "expo",
        "nativescript",
        "react-native",
        "sqlite",
        "sqljs",
    ];
    return (
        supportedDrivers.includes(driver) ||
        (supportedDrivers.includes("sqlite-abstract") &&
            abstractSqlite.includes(driver))
    );
}

export function isSqljs(driver: Driver): driver is SqljsDriver {
    return driver.type === "sqljs";
}
export function isMssql(driver: Driver): driver is SqlServerDriver {
    return driver.type === "mssql";
}
export function isMysql(driver: Driver): driver is MysqlDriver {
    return driver.type === "mysql";
}
export function isAuroraDataApi(driver: Driver): driver is AuroraDataApiDriver {
    return driver.type === "aurora-data-api";
}
export function isOracle(driver: Driver): driver is OracleDriver {
    return driver.type === "oracle";
}

/**
 * Driver organizes TypeORM communication with specific database management system.
 */
export abstract class Driver {
    type: DriverType;

    /**
     * Connection options.
     */
    options: ConnectionOptions;

    /**
     * Master database used to perform all write queries.
     *
     * todo: probably move into query runner.
     */
    database?: string;

    /**
     * Indicates if replication is enabled.
     */
    isReplicated: boolean;

    /**
     * Indicates if tree tables are supported by this driver.
     */
    treeSupport: boolean;

    /**
     * Gets list of supported column data types by a driver.
     */
    supportedDataTypes: ColumnType[];

    /**
     * Default values of length, precision and scale depends on column data type.
     * Used in the cases when length/precision/scale is not specified by user.
     */
    dataTypeDefaults: DataTypeDefaults;

    /**
     * Gets list of spatial column data types.
     */
    spatialTypes: ColumnType[];

    /**
     * Gets list of column data types that support length by a driver.
     */
    withLengthColumnTypes: ColumnType[];

    /**
     * Gets list of column data types that support precision by a driver.
     */
    withPrecisionColumnTypes: ColumnType[];

    /**
     * Gets list of column data types that support scale by a driver.
     */
    withScaleColumnTypes: ColumnType[];

    /**
     * Orm has special columns and we need to know what database column types should be for those types.
     * Column types are driver dependant.
     */
    mappedDataTypes: MappedColumnTypes;

    /**
     * Max length allowed by the DBMS for aliases (execution of queries).
     */
    maxAliasLength?: number;

    /**
     * Performs connection to the database.
     * Depend on driver type it may create a connection pool.
     */
    abstract connect(): Promise<void>;

    /**
     * Makes any action after connection (e.g. create extensions in Postgres driver).
     */
    abstract afterConnect(): Promise<void>;

    /**
     * Closes connection with database and releases all resources.
     */
    abstract disconnect(): Promise<void>;

    /**
     * Synchronizes database schema (creates tables, indices, etc).
     */
    abstract createSchemaBuilder(): SchemaBuilder;

    /**
     * Creates a query runner used for common queries.
     */
    abstract createQueryRunner(mode: "master" | "slave"): QueryRunner;

    /**
     * Replaces parameters in the given sql with special escaping character
     * and an array of parameter names to be passed to a query.
     */
    abstract escapeQueryWithParameters(
        sql: string,
        parameters: ObjectLiteral,
        nativeParameters: ObjectLiteral
    ): [string, any[]];

    /**
     * Escapes a table name, column name or an alias.
     *
     * todo: probably escape should be able to handle dots in the names and automatically escape them
     */
    abstract escape(name: string): string;

    /**
     * Build full table name with database name, schema name and table name.
     * E.g. "myDB"."mySchema"."myTable"
     */
    abstract buildTableName(
        tableName: string,
        schema?: string,
        database?: string
    ): string;

    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    abstract preparePersistentValue(value: any, column: ColumnMetadata): any;

    /**
     * Prepares given value to a value to be persisted, based on its column type.
     */
    abstract prepareHydratedValue(value: any, column: ColumnMetadata): any;

    /**
     * Transforms type of the given column to a database column type.
     */
    abstract normalizeType(column: {
        type?: ColumnType | string;
        length?: number | string;
        precision?: number | null;
        scale?: number;
        isArray?: boolean;
    }): string;

    /**
     * Normalizes "default" value of the column.
     */
    abstract normalizeDefault(columnMetadata: ColumnMetadata): string;

    /**
     * Normalizes "isUnique" value of the column.
     */
    abstract normalizeIsUnique(column: ColumnMetadata): boolean;

    /**
     * Calculates column length taking into account the default length values.
     */
    abstract getColumnLength(column: ColumnMetadata): string;

    /**
     * Normalizes "default" value of the column.
     */
    abstract createFullType(column: TableColumn): string;

    /**
     * Obtains a new database connection to a master server.
     * Used for replication.
     * If replication is not setup then returns default connection's database connection.
     */
    abstract obtainMasterConnection(): Promise<any>;

    /**
     * Obtains a new database connection to a slave server.
     * Used for replication.
     * If replication is not setup then returns master (default) connection's database connection.
     */
    abstract obtainSlaveConnection(): Promise<any>;

    /**
     * Creates generated map of values generated or returned by database after INSERT query.
     */
    abstract createGeneratedMap(
        metadata: EntityMetadata,
        insertResult: any
    ): ObjectLiteral | undefined;

    /**
     * Differentiate columns of this table and columns from the given column metadatas columns
     * and returns only changed.
     */
    abstract findChangedColumns(
        tableColumns: TableColumn[],
        columnMetadatas: ColumnMetadata[]
    ): ColumnMetadata[];

    /**
     * Returns true if driver supports RETURNING / OUTPUT statement.
     */
    abstract isReturningSqlSupported(): boolean;

    /**
     * Returns true if driver supports uuid values generation on its own.
     */
    abstract isUUIDGenerationSupported(): boolean;

    /**
     * Creates an escaped parameter.
     */
    abstract createParameter(parameterName: string, index: number): string;

    // This database name property is nested for replication configs.
    abstract getDatabaseName(): string;

    createEntityManager(
        connection: Connection,
        queryRunner?: QueryRunner
    ): EntityManager {
        return new EntityManager(connection, queryRunner);
    }

    createMigrationExecutor(
        connection: Connection,
        queryRunner?: QueryRunner
    ): MigrationExecutor {
        return new RdbmsMigrationExecutor(connection, queryRunner);
    }

    createStandardRepository() {
        return new Repository<any>();
    }
}
