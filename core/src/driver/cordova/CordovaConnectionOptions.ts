import { TypeORMOptions } from "../../connection/TypeORMOptions";

/**
 * Sqlite-specific connection options.
 */
export interface CordovaConnectionOptions extends TypeORMOptions {
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
}
