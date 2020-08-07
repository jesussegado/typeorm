/**
 * Sqlite-specific connection options.
 */
export interface SqliteConnectionOptions {
    /**
     * Database type.
     */
    readonly type: "sqlite";

    /**
     * Storage type or path to the storage.
     */
    readonly database: string;

    /**
     * Encryption key for for SQLCipher.
     */
    readonly key?: string;
}
