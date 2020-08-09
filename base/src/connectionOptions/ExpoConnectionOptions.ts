/**
 * Sqlite-specific connection options.
 */
export interface ExpoConnectionOptions {
    /**
     * Database type.
     */
    readonly type: "expo";

    /**
     * Database name.
     */
    readonly database: string;

    /**
     * Driver module
     */
    readonly driver: any;
}
