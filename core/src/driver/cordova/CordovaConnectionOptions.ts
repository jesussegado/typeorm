/**
 * Sqlite-specific connection options.
 */
export interface CordovaConnectionOptions {
    /**
     * Database type.
     */
    readonly type: "cordova";

    /**
     * Database name.
     */
    readonly database: string;

    /**
     * Storage Location
     */
    readonly location: string;

    /**
     * Extra connection options to be passed to the underlying driver.
     *
     * todo: deprecate this and move all database-specific types into hts own connection options object.
     */
    readonly extra?: any;
}
